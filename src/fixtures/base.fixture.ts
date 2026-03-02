import { mergeExpects, mergeTests } from '@playwright/test';
import { test as pageTest, expect as pageExpect } from '@fixtures/pages.fixture';
import { test as utilTest, expect as utilExpect } from '@fixtures/utils.fixtures';

export const test = mergeTests(pageTest, utilTest);
export const expect = mergeExpects(pageExpect, utilExpect);
