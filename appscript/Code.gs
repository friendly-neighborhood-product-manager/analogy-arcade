/**
 * Analogy Arcade Apps Script backend.
 *
 * This file is safe to publish because it does not contain API keys,
 * webhook URLs, spreadsheet IDs, or other secret values.
 *
 * Required Apps Script Properties:
 * - ACTIVEPIECES_WEBHOOK_SYNC_URL
 * - DAILY_REQUEST_LIMIT
 * - ANALOGY_ARCADE_BACKEND_SHEET_ID
 */

function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('Index')
    .setTitle('Analogy Arcade')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function generateExplanation(formInput) {
  const webhookUrl = PropertiesService
    .getScriptProperties()
    .getProperty('ACTIVEPIECES_WEBHOOK_SYNC_URL');

  if (!webhookUrl) {
    return {
      ok: false,
      error: 'Missing ACTIVEPIECES_WEBHOOK_SYNC_URL script property.'
    };
  }

  const topic = String(formInput.topic || '').trim();
  const interestWorld = String(formInput.interest_world || '').trim();
  const audienceLevel = String(formInput.audience_level || '').trim();
  const outputStyle = String(formInput.output_style || '').trim();

  if (!topic) {
    return {
      ok: false,
      error: 'Please enter a topic.'
    };
  }

  if (!interestWorld) {
    return {
      ok: false,
      error: 'Please choose an interest world.'
    };
  }

  const requestId = createRequestId();
  const limitCheck = checkDailyLimit();

  if (!limitCheck.allowed) {
    return {
      ok: false,
      request_id: requestId,
      error:
        'Daily demo limit reached. Analogy Arcade is protecting its free AI quota. ' +
        'Please try again tomorrow.',
      usage: limitCheck
    };
  }

  incrementDailyUsage();

  const payload = {
    request_id: requestId,
    topic: topic,
    interest_world: interestWorld,
    audience_level: audienceLevel || 'Beginner',
    output_style: outputStyle || 'ELI5 + analogy + mapping table + mini quiz'
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(webhookUrl, options);
    const statusCode = response.getResponseCode();
    const responseText = response.getContentText();

    if (statusCode < 200 || statusCode >= 300) {
      return {
        ok: false,
        request_id: requestId,
        error: 'Activepieces returned HTTP ' + statusCode,
        raw_response: responseText
      };
    }

    let parsed;

    try {
      parsed = JSON.parse(responseText);
    } catch (parseError) {
      return {
        ok: false,
        request_id: requestId,
        error: 'Could not parse Activepieces response as JSON.',
        raw_response: responseText
      };
    }

    return {
      ok: true,
      request_id: parsed.request_id || requestId,
      status: parsed.status || 'success',
      mode: parsed.mode || 'multi_agent',
      result: parsed.result || '',
      draft_result: parsed.draft_result || '',
      critic: parsed.critic || '',
      usage: checkDailyLimit()
    };

  } catch (error) {
    return {
      ok: false,
      request_id: requestId,
      error: error.message
    };
  }
}

function createRequestId() {
  const now = new Date();

  const timestamp = Utilities.formatDate(
    now,
    Session.getScriptTimeZone(),
    'yyyyMMdd-HHmmss'
  );

  const randomPart = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  return 'AA-' + timestamp + '-' + randomPart;
}

function getDailyLimit() {
  const value = PropertiesService
    .getScriptProperties()
    .getProperty('DAILY_REQUEST_LIMIT');

  const parsed = Number(value);

  if (!parsed || parsed < 1) {
    return 3;
  }

  return parsed;
}

function getTodayKey() {
  const today = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyyMMdd'
  );

  return 'USAGE_COUNT_' + today;
}

function checkDailyLimit() {
  const properties = PropertiesService.getScriptProperties();
  const key = getTodayKey();
  const limit = getDailyLimit();
  const currentCount = Number(properties.getProperty(key) || '0');

  return {
    allowed: currentCount < limit,
    used: currentCount,
    limit: limit,
    remaining: Math.max(limit - currentCount, 0)
  };
}

function incrementDailyUsage() {
  const properties = PropertiesService.getScriptProperties();
  const key = getTodayKey();
  const currentCount = Number(properties.getProperty(key) || '0');

  properties.setProperty(key, String(currentCount + 1));
}

function submitFeedback(feedbackInput) {
  const sheetId = PropertiesService
    .getScriptProperties()
    .getProperty('ANALOGY_ARCADE_BACKEND_SHEET_ID');

  if (!sheetId) {
    return {
      ok: false,
      error: 'Missing ANALOGY_ARCADE_BACKEND_SHEET_ID script property.'
    };
  }

  const requestId = String(feedbackInput.request_id || '').trim();

  if (!requestId) {
    return {
      ok: false,
      error: 'Missing request_id. Feedback must be tied to a generated explanation.'
    };
  }

  const rating = String(feedbackInput.rating || '').trim();
  const feedbackText = String(feedbackInput.feedback_text || '').trim();

  const tooSimple = Boolean(feedbackInput.too_simple);
  const tooComplex = Boolean(feedbackInput.too_complex);
  const analogyWrong = Boolean(feedbackInput.analogy_wrong);
  const notFun = Boolean(feedbackInput.not_fun);
  const wouldShare = Boolean(feedbackInput.would_share);

  const timestamp = Utilities.formatDate(
    new Date(),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd HH:mm:ss'
  );

  try {
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    const feedbackSheet = spreadsheet.getSheetByName('Feedback');

    if (!feedbackSheet) {
      return {
        ok: false,
        request_id: requestId,
        error: 'Feedback sheet/tab not found.'
      };
    }

    feedbackSheet.appendRow([
      requestId,
      timestamp,
      rating,
      feedbackText,
      tooSimple,
      tooComplex,
      analogyWrong,
      notFun,
      wouldShare
    ]);

    return {
      ok: true,
      request_id: requestId,
      message: 'Feedback saved. Thanks for helping improve Analogy Arcade.'
    };

  } catch (error) {
    return {
      ok: false,
      request_id: requestId,
      error: error.message
    };
  }
}
