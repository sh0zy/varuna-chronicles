import { GameState } from './state';

// 垂直スライスの物語データ。描画に依存しない。

export interface ClueDef { id: string; title: string; text: string }
export const CLUES: Record<string, ClueDef> = {
  deep_tracks: { id: 'deep_tracks', title: '深すぎる足跡', text: 'ソラクビの足跡が、普段の倍ほど深く沈み、間隔も広い。群れは歩いていたのではなく、走っていた。' },
  uneven_tracks: { id: 'uneven_tracks', title: '左右で違う足跡', text: '翠角竜の王の足跡。左の後脚だけが浅い。左の背中をかばって歩いている。' },
  horn_marks: { id: 'horn_marks', title: '倒木の角の跡', text: '倒木に残る角の跡。古い倒木はどれも東へ倒されているのに、新しい倒木は向きがばらばらだ。' },
  hum: { id: 'hum', title: '低い唸り', text: '塔の方角から、耳ではなく胸で感じる低い唸り。唸りが強まるたびに、樹海の縁で木が倒れる音がする。' },
  mural: { id: 'mural', title: '塔の壁画', text: '三つの太陽の印――地平から昇る日、天の頂の日、沈む日――に「壱・弐・参」の数。その下に群れの行列と、大地を抱く節のある環。' },
  stuck_juveniles: { id: 'stuck_juveniles', title: '泥の中の幼体', text: '翠角竜の幼体が二頭、泥地にはまって鳴いている。王の群れの子だ。' },
  fence_blocked: { id: 'fence_blocked', title: '柵の前の家族', text: 'ヒメヨロイの家族が、野営地の柵の前を行ったり来たりしている。柵の向こうへ行きたいようだ。' },
  thorn_feathers: { id: 'thorn_feathers', title: '茂みの中の羽毛', text: '野営地の南の棘の茂みに、クサガリの黒い羽毛が絡んでいる。茂みに身を隠して、野営地を窺っていた。' },
  old_eggs: { id: 'old_eggs', title: '砂州の古い卵の殻', text: '川の砂州に、去年の卵の殻が埋まっている。ヒメヨロイは毎年ここで卵を産んでいた。' },
  kohaku_tracks: { id: 'kohaku_tracks', title: '小さな三本指の足跡', text: '若いカゼアシの足跡が一頭分だけ、群れと離れて北へ続いている。間隔が狭い――迷って歩いている。' },
};

export interface DeductionDef { id: string; title: string; text: string; needs: string[][] }
/** needs は「いずれかの組を満たす」 */
export const DEDUCTIONS: Record<string, DeductionDef> = {
  fleeing_herd: { id: 'fleeing_herd', title: '群れは逃げていた', text: '季節外れの群れは、何かから逃げて南へ来た。原因は、もっと北にある。', needs: [['deep_tracks', 'seen:sorakubi']] },
  orga_left: { id: 'orga_left', title: '王の背の傷', text: 'オルガは左の背をかばい、痛みで無秩序に木を倒している。背の左に何かが食い込んでいる。', needs: [['uneven_tracks', 'horn_marks'], ['uneven_tracks', 'stuck_juveniles']] },
  orga_tower: { id: 'orga_tower', title: '塔と王の痛み', text: '塔の唸りが強まるとオルガが暴れる。塔の古い仕組みが、背の何かと響き合っている。塔を止めれば、痛みは弱まるはずだ。', needs: [['hum', 'horn_marks'], ['hum', 'mural']] },
  fence_cut: { id: 'fence_cut', title: '柵が断ったもの', text: '柵がヒメヨロイの産卵の道を断った。棘の低木を食べる者がいなくなり、茂みが増えて、クサガリの隠れ場所になった。守るための柵が、危険を呼び込んでいた。', needs: [['fence_blocked', 'thorn_feathers'], ['fence_blocked', 'old_eggs'], ['thorn_feathers', 'old_eggs']] },
};

export interface RecordDef { id: string; title: string; text: string; era: string }
export const RECORDS: Record<string, RecordDef> = {
  rec_tower: { id: 'rec_tower', title: '見張り塔の銘文', era: 'Ⅳ 凍刻', text: '塔の基壇に刻まれた環刻語。セトなら読めるだろうが、形だけは写せた。命令の形の文字が並ぶ――「群れよ、留まれ。巡るな」。' },
  rec_nine: { id: 'rec_nine', title: '九本石の並び', era: 'Ⅲ 環刻文明', text: '九つの石は、朝日の昇る方角へ弧を描いて並ぶ。人が季節を測り、群れの来る日を知るための印だったらしい。' },
  rec_slab: { id: 'rec_slab', title: '古い群れの道の足跡化石', era: 'Ⅰ 大形成期', text: '岩に残る丸い足跡は、今のソラクビとまったく同じ形をしている。ただし、倍ほど大きい。' },
  rec_tunnel: { id: 'rec_tunnel', title: '根の地下道の門石', era: 'Ⅱ〜Ⅲ', text: '根に抱かれた門石に、輪の形の文字がふたつ。渡り読みの古い歌にも出てくる音――「ヴァル」「ナ」。環と、大地。' },
};

export interface SkillDef { id: string; area: '戦闘' | '探索' | '生態理解' | '工作'; name: string; desc: string; cost: number }
export const SKILLS: SkillDef[] = [
  { id: 'heavy_focus', area: '戦闘', name: '重撃の溜め', desc: '重攻撃で相手の体勢を崩す力が4割増す。大型生物を転ばせやすくなる。', cost: 2 },
  { id: 'counter', area: '戦闘', name: '見切りの返し', desc: '回避の直後0.6秒以内の軽攻撃が、6割強くなる。', cost: 2 },
  { id: 'stamina', area: '探索', name: '息の長い足', desc: '走る・回避・攻撃で使うスタミナが2割5分減る。', cost: 2 },
  { id: 'swim', area: '探索', name: '流れを読む泳ぎ', desc: '泳ぐ速さが4割増し、疲れにくくなる。流れの速い川も渡りやすい。', cost: 2 },
  { id: 'windread', area: '生態理解', name: '風読み', desc: '風向きが方位の上に常に示され、風上にいても匂いで気づかれにくくなる（4割減）。', cost: 2 },
  { id: 'timeread', area: '生態理解', name: '足跡の時読み', desc: '足跡を調べると、経過時間が分単位で分かる。近くの新しい足跡が少し見やすくなる。', cost: 1 },
  { id: 'calm', area: '生態理解', name: '群れの作法', desc: 'ソラクビの群れの中を、走らなければ驚かせずに歩ける。', cost: 3 },
  { id: 'pouch', area: '工作', name: '大きな石袋', desc: '持てる投石が8個増える。', cost: 1 },
];

export interface QuestDef { id: string; title: string; giver: string; kind: 'main' | 'side' | 'ruin'; stages: { text: string; hints: [string, string, string] }[] }
export const QUESTS: Record<string, QuestDef> = {
  prologue: {
    id: 'prologue', title: '季節外れの群れ', giver: '（開始）', kind: 'main',
    stages: [
      { text: '丘から群れを見届け、群れの残した足跡を調べる。', hints: ['群れの通った後の地面を見てみよう。', '丘の東、群れが通った草の倒れた帯に足跡がある。', '足跡に近づくと「調べる」ができる。深さと間隔に注目しよう。'] },
      { text: '大河の曲がりの野営地へ向かう。姉の天幕の人々が待っている。', hints: ['野営地は大河のそば。煙が目印になる。', '丘から東へ。焚き火の煙が上がる崖の上だ。', '地図（M）を開くと、野営地の方角が分かる。'] },
    ],
  },
  main_orga: {
    id: 'main_orga', title: '翠角王の涙', giver: 'エナ婆', kind: 'main',
    stages: [
      { text: '姉イスカの記録「樹海の境で、翠角王が泣いている」。樹海の縁で手がかりを集める。', hints: ['大河を越えた東、樹海との境に倒木地帯がある。浅瀬の渡しから渡れる。', '倒木、足跡、遠くの唸りの音。三つのうち二つを確かめれば、何が起きているか見えてくる。', '倒木地帯の足跡と倒木を「調べる」。北西の丘の塔に近づくと唸りが聞こえる。'] },
      { text: '翠角王オルガの苦しみを解く。塔の唸りを止め、幼体を避難させておくと、戦いが楽になる。', hints: ['正面から殴っても皮に弾かれる。背の「導き杭」を狙う方法を考えよう。', '突進を巨木に誘えば角が刺さって動きが止まる。泥地でも脚が止まる。', '止まっている間に左の脇腹から背に登るか、投石帯で杭を狙う。3本壊すと膝をつく。'] },
      { text: 'オルガは落ち着いた。野営地のエナ婆に知らせる。', hints: ['野営地へ戻ろう。', '焚き火のそばにエナ婆がいる。', '話しかける（E）。'] },
    ],
  },
  tower: {
    id: 'tower', title: '共振の見張り塔', giver: '（遺跡）', kind: 'ruin',
    stages: [
      { text: '丘の上の塔を調べ、唸りを止める方法を探す。', hints: ['塔の南の壁画を見てみよう。', '壁画の三つの太陽には順番がある。輪石の印と見比べよう。', '左の輪石から順に「日の出」「真昼」「日の入り」の印を外側へ向ける。'] },
    ],
  },
  side_fence: {
    id: 'side_fence', title: '柵の向こうの道', giver: 'ポルカ', kind: 'side',
    stages: [
      { text: '柵を作ってから、なぜかクサガリが野営地の近くに来るようになった。柵のまわりを調べる。', hints: ['柵の外側を歩いてみよう。', '柵の前で行き来する生き物、南の棘の茂み、川の砂州。', '三つのうち二つを調べると、つながりが見える。'] },
      { text: '棘の低木とヒメヨロイについて、記録係のニコに聞く。', hints: ['野営地の研究机にニコがいる。', '', ''] },
      { text: 'どうするか決める：柵に小さな通り道を開けるか、自分で棘の茂みを刈るか。', hints: ['柵の南の、ヒメヨロイが集まっていた場所。', '通り道は柵の低い所を外すだけ。茂みを刈るなら8つ。', '柵に近づいて「調べる」／茂みに近づいて「刈る」。'] },
      { text: 'ポルカに結果を伝える。', hints: ['焚き火のそばのポルカへ。', '', ''] },
    ],
  },
  bond_kohaku: {
    id: 'bond_kohaku', title: 'はぐれたコハク', giver: 'タルク', kind: 'side',
    stages: [
      { text: 'タルクの若いカゼアシ「コハク」がはぐれた。足跡を追って探す。', hints: ['野営地の北へ続く小さな三本指の足跡を探そう。', '足跡を調べると向かった方角が分かる。', '野営地から北、川沿いの草地にいる。'] },
      { text: '驚かせずに近づく。風下から、身を低くして。', hints: ['方位の上の細い線が風向き。風下とは、風が自分に向かって吹いてくる側。', 'しゃがむ（C）と足音も姿も小さくなる。', 'コハクが首を上げて見つめたら、止まって待とう。6mまで近づけば手を伸ばせる。'] },
      { text: 'コハクの好きなツユミ草（赤い実の草）を3つ摘んで差し出す。', hints: ['近くの川岸に赤い実をつけた草がある。', '', ''] },
      { text: 'コハクを川の水場まで送り、クサガリから守る。', hints: ['コハクは川へ歩き出す。そばを離れないように。', 'クサガリは大きな音を嫌う。音玉（G）も使える。', '水を飲み終えるまで、クサガリを近づけないこと。'] },
      { text: 'タルクのところへ戻る。', hints: ['野営地の荷車のそばにタルクがいる。', '', ''] },
    ],
  },
  jade_gate: {
    id: 'jade_gate', title: '翡翠の門の向こう', giver: '（探索）', kind: 'main',
    stages: [
      { text: 'オルガが倒した巨木の橋を渡り、樹海の奥の「根の地下道」を確かめる。', hints: ['根の谷の上に倒木の橋が架かっている。', '橋の北に、巨大な根のアーチ（翡翠の門）がある。', '門のさらに奥、根に抱かれた暗い入口。'] },
    ],
  },
};

// ---------------------------------------------------------------- 会話

export interface DialogueLine { who: string; text: string }
export interface DialogueChoice { label: string; tone?: '観察する' | '寄り添う' | '押し通す'; action: string }
export interface Dialogue { lines: DialogueLine[]; choices?: DialogueChoice[]; action?: string }

const q = (s: GameState, id: string) => s.quests[id];
const done = (s: GameState, id: string) => !!s.quests[id]?.done;
const stage = (s: GameState, id: string) => s.quests[id]?.stage ?? -1;

export const NPCS = {
  ena: { name: 'エナ婆', role: '老いた渡り読み。トワとイスカの師' },
  tarku: { name: 'タルク', role: '渡りの民の若長の子。幼なじみ' },
  porka: { name: 'ポルカ', role: '調査隊の料理人' },
  niko: { name: 'ニコ', role: '調査隊の記録係' },
  iva: { name: 'イヴァ', role: '調査隊の工匠' },
} as const;
export type NpcId = keyof typeof NPCS;

export function dialogueFor(npc: NpcId, s: GameState): Dialogue {
  const me = s.appearance.name;
  if (npc === 'ena') {
    if (!q(s, 'main_orga')) {
      return {
        lines: [
          { who: 'エナ婆', text: `${me}……よく戻った。ハセの輪は、半分が踏み荒らされた。` },
          { who: 'エナ婆', text: 'イスカは昨夜、「北の震え」を調べに出たきり戻らん。天幕にこれが残っておった。' },
          { who: '（姉の記録）', text: '「樹海の境で、翠角王が泣いている。群れの道が壊れている。――四つの巡りは同じ根を持つのかもしれない」' },
          { who: 'エナ婆', text: '翠角王は、木を倒して草の道を作る王じゃ。王が泣けば、群れは道を失う。お前の足で確かめておいで。' },
        ],
        choices: [
          { label: '姉さんは、なぜ一人で行ったんだ？', tone: '観察する', action: 'ena_why' },
          { label: '必ず、姉さんの跡を追う。', tone: '押し通す', action: 'start_orga' },
          { label: 'エナ婆も、ここで休んでいて。', tone: '寄り添う', action: 'start_orga_soft' },
        ],
      };
    }
    if (stage(s, 'main_orga') === 2) {
      return {
        lines: [
          { who: 'エナ婆', text: '……聞こえたよ。樹海の方で、大きな木が一本、谷へ倒れる音が。' },
          { who: 'エナ婆', text: '王は泣き止んだ。群れはまた、あの空き地を通るじゃろう。' },
          { who: 'エナ婆', text: `その杭……石環院の者なら読めるかもしれん。イスカもきっと、同じものを見たはずじゃ。${me}、お前はもう、立派な渡り読みじゃよ。` },
        ],
        action: 'finish_orga',
      };
    }
    if (done(s, 'main_orga')) {
      return { lines: [{ who: 'エナ婆', text: '橋の向こうは翡翠の樹海。根の地下道を抜ければ、内海へ出る。イスカの足跡も、きっとその先じゃ。' }, { who: 'エナ婆', text: '（この垂直スライスの物語はここまでです。樹海の奥を歩き、図鑑を埋めることはできます）' }] };
    }
    return { lines: [{ who: 'エナ婆', text: '樹海の境は大河の向こう。浅瀬の渡しを使いなされ。王の足跡を読むんじゃ。' }] };
  }
  if (npc === 'tarku') {
    const bq = q(s, 'bond_kohaku');
    if (!bq) {
      return {
        lines: [
          { who: 'タルク', text: `${me}！　無事だったか。……うちのコハクが、大移動の騒ぎではぐれちまった。` },
          { who: 'タルク', text: 'まだ若いカゼアシだ。あいつの足跡は小さい三本指。北へ行ったのは見えたんだが……俺は群れを離れられない。' },
        ],
        choices: [
          { label: '足跡を読んで、連れて帰る。', tone: '押し通す', action: 'start_kohaku' },
          { label: 'どんな性格の子？', tone: '観察する', action: 'kohaku_info' },
        ],
      };
    }
    if (bq.stage === 4) {
      return {
        lines: [
          { who: 'タルク', text: 'コハク！……お前に懐いたみたいだな。いいさ、連れていけ。渡り読みには足が要る。' },
          { who: 'タルク', text: '口笛（H）で呼べば来る。ただし、深い水と肉食獣の匂いは大嫌いだ。無理をさせるなよ。' },
        ],
        action: 'finish_kohaku',
      };
    }
    if (bq.done) return { lines: [{ who: 'タルク', text: 'コハクは速いだろ？　草海なら誰にも負けない。でも登れないし泳げない。そこはお前の足で行け。' }] };
    return { lines: [{ who: 'タルク', text: 'コハクは臆病だ。風上から近づくと、匂いで逃げちまう。' }] };
  }
  if (npc === 'porka') {
    const fq = q(s, 'side_fence');
    if (!fq) {
      return {
        lines: [
          { who: 'ポルカ', text: '柵を立ててからというもの、夜になるとクサガリの鳴き声が近いんだよ。柵が足りないのかねえ……もっと高くしようか。' },
        ],
        choices: [
          { label: '柵のまわりを調べてみる。', tone: '観察する', action: 'start_fence' },
          { label: '高くする前に、少し待って。', tone: '寄り添う', action: 'start_fence' },
        ],
      };
    }
    if (fq.stage === 3) {
      const gap = fq.outcome === 'gap';
      return {
        lines: gap
          ? [{ who: 'ポルカ', text: '柵に穴を開けた！？……でも、小さな通り道だけなのね。ヒメヨロイが茂みを食べてくれるなら、クサガリの隠れ場所も減る、か。' }, { who: 'ポルカ', text: '次の夏まで様子を見るよ。あんたの読みを信じる。' }]
          : [{ who: 'ポルカ', text: '茂みを刈ってくれたんだね。見通しがよくなって、夜も安心だ。' }, { who: 'ポルカ', text: 'でも……茂みはまた伸びるんだろう？　ヒメヨロイの家族は、まだ柵の前にいるよ。' }],
        action: 'finish_fence',
      };
    }
    if (fq.done) return { lines: [{ who: 'ポルカ', text: fq.outcome === 'gap' ? '今朝、小さな甲羅の家族が砂州の方へ歩いていったよ。' : '刈った棘は、イヴァが煙玉の材料にしたってさ。' }] };
    return { lines: [{ who: 'ポルカ', text: '柵のまわり、何か見つかったかい？' }] };
  }
  if (npc === 'niko') {
    const fq = q(s, 'side_fence');
    if (fq && fq.stage === 1) {
      return {
        lines: [
          { who: 'ニコ', text: 'ヒメヨロイ？　棘の低木が大好物だよ。あの棘ごと、ばりばり食べる。' },
          { who: 'ニコ', text: '毎年、雨季の初めに砂州で卵を産むんだ。……あ。柵、ちょうどその通り道だね。' },
        ],
        action: 'fence_stage2',
      };
    }
    const n = Object.keys(s.codex).length;
    return {
      lines: [
        { who: 'ニコ', text: n < 3 ? '図鑑は、見るだけじゃ埋まらないよ。足跡、鳴き声、何を食べて、どこで眠るか。' : `もう${n}種も記録したの？　展示棚に、見つけた物を並べておいたよ。` },
        { who: 'ニコ', text: '図鑑は研究机（この机）でも、調査手帳（J）でも見られる。' },
      ],
    };
  }
  if (npc === 'iva') {
    const solved = [done(s, 'side_fence'), done(s, 'bond_kohaku'), done(s, 'main_orga')].filter(Boolean).length;
    if (!s.lookout && solved >= 1) {
      return {
        lines: [
          { who: 'イヴァ', text: '野営地を少し大きくしよう。見張り台を一つ建てられる。場所は二つ考えてる。' },
          { who: 'イヴァ', text: '崖の上なら草海が遠くまで見渡せる。川辺なら、水場に来る生き物がよく見える。どっちにする？' },
        ],
        choices: [
          { label: '崖の上（遠くの群れと地形が見える）', action: 'build_A' },
          { label: '川辺（水場の生き物を観察しやすい）', action: 'build_B' },
          { label: 'もう少し考える', action: 'none' },
        ],
      };
    }
    if (s.lookout) return { lines: [{ who: 'イヴァ', text: s.lookout === 'A' ? '見張り台からの眺めはどう？　群れの道がよく見えるだろう。' : '川辺の見張り台、カゲワタリが狩りに来るのがよく見えるよ。' }] };
    return { lines: [{ who: 'イヴァ', text: '人手と材料が揃えば、もっと住みやすくできる。まずはこの辺りの困りごとを片付けてくれると助かる。' }, { who: 'イヴァ', text: '石袋と道具は、荷車の箱から補充していって。' }] };
  }
  return { lines: [] };
}

export const EXTRA_LINES: Record<string, DialogueLine[]> = {
  ena_why: [
    { who: 'エナ婆', text: 'あの子は、自分にしか読めんと思うておる。……昔から、そういう子じゃった。' },
    { who: 'エナ婆', text: 'お前はお前の読み方で追えばよい。' },
  ],
  kohaku_info: [
    { who: 'タルク', text: '臆病だけど、赤いツユミ草の実には目がない。水場へ行くときは、いつも俺の後ろをついてくる。' },
  ],
};

export const MUSEUM_ITEMS: Record<string, { name: string; desc: string; color: number; shape: 'feather' | 'shell' | 'device' | 'slab' | 'horn' | 'egg' }> = {
  feather_kusagari: { name: 'クサガリの羽毛', desc: '黒い風切り羽。先が擦り切れている。', color: 0x2e2a22, shape: 'feather' },
  feather_kazeashi: { name: 'カゼアシの羽毛', desc: '縞のある柔らかい羽。', color: 0x9a7a52, shape: 'feather' },
  device_part: { name: '導き杭の部品', desc: 'オルガの背から抜いた環銅の杭。輪の文字が刻まれ、かすかに温かい。', color: 0x4f8a7a, shape: 'device' },
  egg_shell: { name: 'ヒメヨロイの卵の殻', desc: '砂州で見つけた去年の殻。', color: 0xd8ccb0, shape: 'egg' },
  slab_cast: { name: '足跡化石の写し', desc: '古い群れの道の足跡化石を粘土に写したもの。今のソラクビの倍の大きさ。', color: 0x8a8272, shape: 'slab' },
  horn_chip: { name: '翠角竜の角片', desc: '倒木に刺さっていた角の欠片。', color: 0xd8cfae, shape: 'horn' },
};
