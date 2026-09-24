import { Simplex2, clamp, smoothstep, lerp } from './noise';

/** ゲーム内の1時間＝実時間150秒（1日＝60分）。休息で時刻を進められる。 */
export const REAL_SECONDS_PER_HOUR = 150;

export type WeatherKind = 'clear' | 'fog' | 'cloudy' | 'rain';
export const WEATHER_NAMES: Record<WeatherKind, string> = { clear: '晴れ', fog: '霧', cloudy: '曇り', rain: 'にわか雨' };

export class WorldClock {
  /** 経過したゲーム内時間（時間単位）。0 = 1日目 0:00 */
  total = 5.3;
  scale = 1;
  private n = new Simplex2(77);

  get hour() { return ((this.total % 24) + 24) % 24; }
  get day() { return Math.floor(this.total / 24) + 1; }
  advance(realDt: number) { this.total += (realDt / REAL_SECONDS_PER_HOUR) * this.scale; }
  /** 次に指定時刻になるまで進める */
  skipTo(hour: number) {
    let d = hour - this.hour;
    if (d <= 0.05) d += 24;
    this.total += d;
  }
  label() {
    const h = Math.floor(this.hour);
    const m = Math.floor((this.hour - h) * 60);
    return `${this.day}日目 ${h}:${m.toString().padStart(2, '0')}`;
  }
  phaseName(h = this.hour) {
    if (h < 4.5) return '夜';
    if (h < 7) return '夜明け';
    if (h < 11) return '朝';
    if (h < 15) return '昼';
    if (h < 17.5) return '午後';
    if (h < 19.5) return '夕暮れ';
    return '夜';
  }
  isNight(h = this.hour) { return h < 5 || h > 19.6; }
  /** 0=真夜中, 1=真昼 の明るさ */
  daylight(h = this.hour) {
    return smoothstep(4.6, 7.2, h) * (1 - smoothstep(17.4, 19.8, h));
  }

  /** ある時刻（total）の天候を決定的に求める。予報と実際の天候が一致する */
  weatherAt(total: number): { kind: WeatherKind; fog: number; cloud: number; rain: number } {
    const h = ((total % 24) + 24) % 24;
    const dayN = Math.floor(total / 24);
    const cloudN = this.n.fbm(total * 0.045, 3.1, 2) * 0.5 + 0.5;
    const rainN = this.n.noise(total * 0.09, 17.3) * 0.5 + 0.5;
    // 朝霧：夜明けに強く、昼までに晴れる。日によって濃さが違う
    const fogDay = 0.55 + 0.45 * (this.n.noise(dayN * 1.7, 9.2) * 0.5 + 0.5);
    let fog = fogDay * smoothstep(3.5, 5.5, h) * (1 - smoothstep(8.2, 10.5, h));
    fog = Math.max(fog, 0.25 * smoothstep(20, 23, h) * (1 - smoothstep(0, 3, h)));
    let cloud = smoothstep(0.35, 0.8, cloudN);
    let rain = cloud > 0.62 ? smoothstep(0.6, 0.78, rainN) * smoothstep(0.62, 0.8, cloud) : 0;
    // 最初の1時間は必ず霧の夜明け（開始の絶景を保証する）
    if (total < 7.2) { fog = Math.max(fog, 0.9 * (1 - smoothstep(6.4, 7.2, total))); rain = 0; cloud = Math.min(cloud, 0.3); }
    let kind: WeatherKind = 'clear';
    if (rain > 0.35) kind = 'rain';
    else if (fog > 0.45) kind = 'fog';
    else if (cloud > 0.55) kind = 'cloudy';
    return { kind, fog: clamp(fog, 0, 1), cloud, rain };
  }

  forecast(hours = 12): { hour: number; kind: WeatherKind }[] {
    const out: { hour: number; kind: WeatherKind }[] = [];
    const start = Math.ceil(this.total);
    for (let i = 0; i < hours; i += 2) {
      const t = start + i;
      out.push({ hour: ((t % 24) + 24) % 24, kind: this.weatherAt(t + 0.5).kind });
    }
    return out;
  }

  /** 風向き（ラジアン、風が吹いていく方向）と強さ 0〜1 */
  wind(total = this.total): { dir: number; strength: number } {
    const dir = -0.6 + this.n.noise(total * 0.03, 50.5) * 1.6; // 主に西風（東へ吹く）
    const strength = clamp(0.35 + this.n.noise(total * 0.12, 81.2) * 0.35 + this.weatherAt(total).rain * 0.3, 0.08, 1);
    return { dir, strength };
  }
}

export function sunDirection(hour: number): { x: number; y: number; z: number } {
  // 6時に東(+x)から昇り、18時に西(-x)へ沈む。南(+z)寄りを通る
  const t = ((hour - 6) / 12) * Math.PI;
  const y = Math.sin(t);
  const x = Math.cos(t);
  const z = 0.35;
  const l = Math.hypot(x, y, z);
  return { x: x / l, y: y / l, z: z / l };
}

export function moonDirection(hour: number) {
  const s = sunDirection((hour + 12) % 24);
  return { x: s.x * 0.9, y: s.y, z: -0.3 };
}

export { lerp };
