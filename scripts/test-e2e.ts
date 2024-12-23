import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Load environment variables
dotenv.config();

// Read the PR payload
const prPayload = JSON.parse(
  readFileSync(resolve(__dirname, './pull-requests/test-pr-payload-982.json'), 'utf8')
);

// Set required environment variables for the action
process.env.GITHUB_EVENT_PATH = resolve(__dirname, './pull-requests/test-pr-payload-982.json');
process.env.GITHUB_WORKSPACE = resolve(__dirname, '..');
process.env.GITHUB_REPOSITORY = 'demandio/simplycodes-extension';
process.env.GITHUB_CONTEXT = JSON.stringify({
  event: prPayload,
  payload: prPayload
});

// IMPORTANT: Make sure the token is set before setting INPUT_GITHUB_TOKEN
process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.INPUT_GITHUB_TOKEN;

// Set action inputs (these would normally come from action.yml)
process.env.INPUT_GITHUB_TOKEN = process.env.GITHUB_TOKEN;
process.env.INPUT_AI_PROVIDER = 'openai';
process.env.INPUT_AI_API_KEY = process.env.OPENAI_API_KEY;
process.env.INPUT_AI_MODEL = 'gpt-4o-mini';
process.env.INPUT_REVIEW_MAX_COMMENTS = '10';
process.env.INPUT_EXCLUDE = '**/*.md,**/*.json';
process.env.INPUT_APPROVE_REVIEWS = 'false';
process.env.INPUT_REVIEW_PROJECT_CONTEXT = 'This is a browser extension for SimplyCodes';

// Run the action
require('../lib/src/main');
