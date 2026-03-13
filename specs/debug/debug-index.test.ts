/* eslint-disable no-console */
import { test } from '@fixtures/base-fixture';
import { expect } from '@playwright/test';

test.describe('Infrastructure Debugging', () => {
  test('Log Worker Identity and Auth Path', async ({}, testInfo) => {
    const isCI = !!process.env.CI;
    const shardIndex = parseInt(process.env.SHARD_INDEX || '1');
    // eslint-disable-next-line playwright/no-conditional-in-test
    const workersPerShard = isCI ? 2 : 1;
    const parallelIndex = testInfo.parallelIndex;

    // The exact formula from your config
    const globalIndex = (shardIndex - 1) * workersPerShard + parallelIndex;

    console.log('--------------------------------------------------');
    console.log(`🚀 SHARD INDEX:   ${shardIndex}`);
    console.log(`👷 WORKER INDEX:  ${parallelIndex}`);
    console.log(`🌍 GLOBAL INDEX:  ${globalIndex}`);
    console.log(`📂 EXPECTED FILE: .auth/web-customer-${globalIndex}.json`);
    console.log('--------------------------------------------------');
    expect(true).toBe(true);
  });
});
