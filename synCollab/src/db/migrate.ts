import { db } from './client';

const LATEST_VERSION = 1;

export async function migrate(): Promise<void> {
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;

  if (version >= LATEST_VERSION) return;

  if (version < 1) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
                CREATE TABLE IF NOT EXISTS users (
                    id                  TEXT PRIMARY KEY NOT NULL,
                    TITLE               TEXT NOT NULL,
                    description         TEXT,
                    status              TEXT NOT NULL DEFAULT 'pending',
                    priority            TEXT NOT NULL DEFAULT 'medium',
                    created_by          TEXT NOT NULL,
                    client_updated_at   TEXT NOT NULL,
                    updated_at          TEXT,
                    deleted             INTEGER NOT NULL DEFAULT 0
                );


                `);
    });
    version = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${LATEST_VERSION}`);
}
