// 本番ビルドを gh-pages ブランチへ配置する（GitHub Pages で公開するため）。
// 使い方: npm run deploy
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'pipe', encoding: 'utf8', ...opts }).trim();
const dist = path.resolve('dist');
if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html がありません。先に `npm run build` を実行してください。');
  process.exit(1);
}
// GitHub Pages が Jekyll として処理しないようにする
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

const remote = run('git', ['remote', 'get-url', 'origin']);
const sha = run('git', ['rev-parse', '--short', 'HEAD']);
const msg = `公開：${sha} の本番ビルド`;

// dist を独立した履歴（gh-pages）として作り直し、強制的に置き換える
fs.rmSync(path.join(dist, '.git'), { recursive: true, force: true });
const git = (...args) => run('git', args, { cwd: dist });
git('init', '-b', 'gh-pages');
git('config', 'user.name', run('git', ['config', 'user.name']) || 'deploy');
git('config', 'user.email', run('git', ['config', 'user.email']) || 'deploy@example.com');
git('add', '-A');
git('commit', '-m', msg);
git('push', '--force', remote, 'gh-pages');
fs.rmSync(path.join(dist, '.git'), { recursive: true, force: true });
console.log(`gh-pages へ配置しました（${sha}）`);
