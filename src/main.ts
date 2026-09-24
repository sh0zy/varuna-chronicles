import './ui/style.css';
import { Game } from './game/game';
import { UI } from './ui/ui';

// 起動：WebGL2 が使えない環境では、理由を示して止まる。
function webglOk() {
  try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
}

const app = document.getElementById('app')!;
if (!webglOk()) {
  app.innerHTML = '<div style="padding:3em;font-family:serif;color:#eee;background:#111;height:100vh">このゲームには WebGL2 に対応したブラウザ（Edge・Chrome・Firefox の最新版）とグラフィック機能が必要です。</div>';
} else {
  const game = new Game(app);
  const ui = new UI(game);
  document.documentElement.dataset.textSize = game.settings.textSize;
  document.documentElement.dataset.colorAid = game.settings.colorAid ? '1' : '0';
  game.boot(ui).catch((e) => { console.error(e); ui.fatal(String(e?.stack ?? e)); });
  // オフラインでも遊べるようにする（本番のビルドのみ）
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => { /* 使えない環境でもそのまま遊べる */ });
    });
  }
}
