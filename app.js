const STORAGE_KEYS = {
  profile: "arise-profile",
  taskState: "arise-task-state",
  reports: "arise-reports",
  audit: "arise-audit",
  drafts: "arise-report-drafts"
};

const PLAYER_NICKNAME = "RUS";
const CLOUD_TABLE = "app_state";
const SUPABASE_CONFIG = window.SUPABASE_CONFIG || {};

const RANKS = [
  { rank: "E", min: 0, title: "新手獵人", color: "#8fa4ff" },
  { rank: "D", min: 800, title: "覺醒者", color: "#67d3ff" },
  { rank: "C", min: 2400, title: "影子新兵", color: "#58f2c5" },
  { rank: "B", min: 5600, title: "精英戰士", color: "#a67dff" },
  { rank: "A", min: 10000, title: "國家級獵人", color: "#ffb649" },
  { rank: "S", min: 18000, title: "影之君主", color: "#ff6b8f" }
];

const WEEKLY_QUESTS = {
  mon: {
    day: "週一",
    zh: "星期一",
    type: "健身",
    color: "#ff6b8f",
    title: "上半身 · 力量日",
    calTarget: 2650,
    pTarget: 155,
    quests: [
      {
        cat: "飲食",
        icon: "🍽️",
        tasks: [
          { id: "mon-b", task: "早餐 · 茶記雙蛋多士配飲品", xp: 30, meta: "高蛋白開局" },
          { id: "mon-l", task: "午餐 · 雞扒飯走汁少飯", xp: 40, meta: "主力補瘦肉蛋白" },
          { id: "mon-d", task: "晚餐 · Whey + 雞胸 + 番薯 + 菜", xp: 50, meta: "恢復餐" }
        ]
      },
      {
        cat: "訓練",
        icon: "🏋️",
        tasks: [
          { id: "mon-t1", task: "Bench Press 4 x 5 重量", xp: 50 },
          { id: "mon-t2", task: "Barbell Row 4 x 6", xp: 40 },
          { id: "mon-t3", task: "OHP 3 x 8", xp: 35 },
          { id: "mon-t4", task: "單手 Dumbbell Row 3 x 10", xp: 30 },
          { id: "mon-t5", task: "Lateral Raise + Face Pull 收尾", xp: 25 },
          { id: "mon-t6", task: "Concentration Curl 3 x 12", xp: 20 }
        ]
      },
      {
        cat: "恢復",
        icon: "🚶",
        tasks: [
          { id: "mon-r1", task: "午飯後行 20 分鐘", xp: 20 },
          { id: "mon-r2", task: "行夠 6,000+ 步", xp: 15 },
          { id: "mon-r3", task: "11:30pm 前瞓", xp: 40 }
        ]
      }
    ]
  },
  tue: {
    day: "週二",
    zh: "星期二",
    type: "休息",
    color: "#8091b0",
    title: "主動恢復 · NEAT",
    calTarget: 2200,
    pTarget: 155,
    quests: [
      {
        cat: "飲食",
        icon: "🍽️",
        tasks: [
          { id: "tue-b", task: "早餐 · 沙嗲牛麵加蛋", xp: 30, meta: "卡路里唔好爆" },
          { id: "tue-l", task: "午餐 · 牛腩飯走汁", xp: 40, meta: "控制份量" },
          { id: "tue-d", task: "晚餐 · 蒸魚 + 菜 + Casein", xp: 50, meta: "蛋白質優先" }
        ]
      },
      {
        cat: "恢復",
        icon: "🧘",
        tasks: [
          { id: "tue-t1", task: "Foam Roll 15 分鐘 + 拉筋", xp: 20 },
          { id: "tue-t2", task: "膝頭 rehab decline squat 3 x 15", xp: 25 },
          { id: "tue-t3", task: "午飯後行 30 分鐘", xp: 20 },
          { id: "tue-t4", task: "行夠 6,000+ 步", xp: 15 },
          { id: "tue-t5", task: "11:30pm 前瞓", xp: 40 }
        ]
      },
      {
        cat: "加分任務",
        icon: "🏀",
        tasks: [
          { id: "tue-s1", task: "自己練波 35 分鐘", xp: 60, meta: "可選 bonus quest" }
        ]
      }
    ]
  },
  wed: {
    day: "週三",
    zh: "星期三",
    type: "跑步",
    color: "#67d3ff",
    title: "Zone 2 輕鬆跑",
    calTarget: 2200,
    pTarget: 155,
    quests: [
      {
        cat: "飲食",
        icon: "🍽️",
        tasks: [
          { id: "wed-b", task: "早餐 · 麵 + 多士 + 茶", xp: 30 },
          { id: "wed-l", task: "午餐 · 蒸肉餅飯加湯", xp: 40 },
          { id: "wed-d", task: "晚餐 · 三文魚 + 飯 + 菜 + Casein", xp: 50 }
        ]
      },
      {
        cat: "帶氧",
        icon: "🏃",
        tasks: [
          { id: "wed-t1", task: "Zone 2 跑 40 至 45 分鐘", xp: 60, meta: "心率保持穩定" },
          { id: "wed-t2", task: "Keep 到講到嘢嘅 pace", xp: 30 },
          { id: "wed-t3", task: "Cooldown 行路 + 拉筋", xp: 10 }
        ]
      },
      {
        cat: "恢復",
        icon: "🌙",
        tasks: [{ id: "wed-r1", task: "11:30pm 前瞓", xp: 40 }]
      }
    ]
  },
  thu: {
    day: "週四",
    zh: "星期四",
    type: "健身",
    color: "#ff7f5b",
    title: "下半身 · 複合動作日",
    calTarget: 2650,
    pTarget: 155,
    quests: [
      {
        cat: "飲食",
        icon: "🍽️",
        tasks: [
          { id: "thu-b", task: "早餐 · 吞拿魚三文治加蛋", xp: 30 },
          { id: "thu-l", task: "午餐 · 海南雞飯", xp: 40, meta: "幫腿日補油" },
          { id: "thu-d", task: "晚餐 · Whey + 雞胸 + 番薯 + 菜", xp: 50 }
        ]
      },
      {
        cat: "訓練",
        icon: "🏋️",
        tasks: [
          { id: "thu-t1", task: "Squat 4 x 5 重量", xp: 60 },
          { id: "thu-t2", task: "Romanian Deadlift 4 x 6", xp: 45 },
          { id: "thu-t3", task: "Bulgarian Split Squat 每邊 3 x 10", xp: 35 },
          { id: "thu-t4", task: "Leg Press + Calf Raise 收尾", xp: 25 },
          { id: "thu-t5", task: "Hanging Leg Raise 3 x 15", xp: 15 }
        ]
      },
      {
        cat: "恢復",
        icon: "🚶",
        tasks: [
          { id: "thu-r1", task: "午飯後行路 + 6,000 步", xp: 20 },
          { id: "thu-r2", task: "11:30pm 前瞓", xp: 40 }
        ]
      }
    ]
  },
  fri: {
    day: "週五",
    zh: "星期五",
    type: "休息",
    color: "#8091b0",
    title: "賽前 · 補碳日",
    calTarget: 2200,
    pTarget: 155,
    quests: [
      {
        cat: "飲食",
        icon: "🍽️",
        tasks: [
          { id: "fri-b", task: "早餐 · 奄列 + 多士", xp: 30 },
          { id: "fri-l", task: "午餐 · 高碳水飯或粉麵", xp: 40, meta: "補能量但唔好過火" },
          { id: "fri-d", task: "晚餐 · 意粉 + 吞拿魚 + Casein", xp: 50 }
        ]
      },
      {
        cat: "恢復",
        icon: "🧘",
        tasks: [
          { id: "fri-t1", task: "全休或者 mobility 10 分鐘", xp: 15 },
          { id: "fri-t2", task: "膝頭 rehab decline squat 3 x 15", xp: 25 },
          { id: "fri-t3", task: "午飯後行 20 分鐘", xp: 15 },
          { id: "fri-t4", task: "11:30pm 前瞓", xp: 40 }
        ]
      }
    ]
  },
  sat: {
    day: "週六",
    zh: "星期六",
    type: "賽前",
    color: "#b88cff",
    title: "賽前第二日 · 進入狀態",
    calTarget: 2400,
    pTarget: 155,
    quests: [
      {
        cat: "飲食",
        icon: "🍽️",
        tasks: [
          { id: "sat-b", task: "早餐 · 沙嗲牛麵加雙蛋", xp: 30 },
          { id: "sat-l", task: "午餐 · 雞扒意粉或者雙拼飯", xp: 40 },
          { id: "sat-d", task: "晚餐 · 意粉 + 吞拿魚 + 瞓前 Casein", xp: 50 }
        ]
      },
      {
        cat: "賽前準備",
        icon: "🎯",
        tasks: [
          { id: "sat-g1", task: "Check 波鞋、毛巾、水同裝備", xp: 10 },
          { id: "sat-g2", task: "想像走位同 off-ball route", xp: 20 },
          { id: "sat-g3", task: "10:30pm 前瞓", xp: 50 }
        ]
      }
    ]
  },
  sun: {
    day: "週日",
    zh: "星期日",
    type: "比賽",
    color: "#ffb649",
    title: "比賽日 · 5v5",
    calTarget: 2800,
    pTarget: 155,
    quests: [
      {
        cat: "賽前",
        icon: "⚡",
        tasks: [
          { id: "sun-p1", task: "早起身，開波前食啲嘢補油", xp: 30 },
          { id: "sun-p2", task: "5v5 前完整 warm-up", xp: 40 }
        ]
      },
      {
        cat: "比賽",
        icon: "🏀",
        tasks: [
          { id: "sun-g1", task: "打 5v5，shot selection 要自律", xp: 80 },
          { id: "sun-g2", task: "手感凍就跟 cold-streak protocol", xp: 20 },
          { id: "sun-g3", task: "攰就即時調整出手選擇", xp: 20 }
        ]
      },
      {
        cat: "恢復",
        icon: "📦",
        tasks: [
          { id: "sun-r1", task: "打完波補 lunch 同蛋白質", xp: 40 },
          { id: "sun-r2", task: "準備下星期 meal prep", xp: 50 },
          { id: "sun-r3", task: "膝頭痛就冰敷", xp: 15 },
          { id: "sun-r4", task: "11:30pm 前瞓", xp: 40 }
        ]
      }
    ]
  }
};

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const TASK_XP_MAP = buildTaskXpMap();
const FOOD_LIBRARY = [
  { id: "chicken-breast", name: "雞胸肉", serving: "100g", calories: 165, protein: 31 },
  { id: "salmon", name: "三文魚", serving: "100g", calories: 208, protein: 20 },
  { id: "white-rice", name: "白飯", serving: "1 碗", calories: 260, protein: 4 },
  { id: "sweet-potato", name: "番薯", serving: "100g", calories: 86, protein: 1.6 },
  { id: "egg", name: "雞蛋", serving: "1 隻", calories: 78, protein: 6 },
  { id: "whey", name: "Whey", serving: "1 scoop", calories: 120, protein: 24 },
  { id: "casein", name: "Casein", serving: "1 scoop", calories: 120, protein: 24 },
  { id: "greek-yogurt", name: "希臘乳酪", serving: "1 杯", calories: 130, protein: 11 },
  { id: "banana", name: "香蕉", serving: "1 隻", calories: 105, protein: 1.3 },
  { id: "apple", name: "蘋果", serving: "1 個", calories: 95, protein: 0.5 },
  { id: "tuna-can", name: "吞拿魚罐頭", serving: "1 罐", calories: 132, protein: 28 },
  { id: "steamed-fish", name: "蒸魚", serving: "100g", calories: 128, protein: 23 },
  { id: "tofu", name: "豆腐", serving: "100g", calories: 76, protein: 8 },
  { id: "oats", name: "燕麥", serving: "50g", calories: 194, protein: 8.5 },
  { id: "milk-tea", name: "港式奶茶", serving: "1 杯", calories: 180, protein: 4 },
  { id: "lemon-tea", name: "凍檸茶", serving: "1 杯", calories: 120, protein: 0 },
  { id: "coffee-bun", name: "菠蘿包", serving: "1 個", calories: 320, protein: 6 },
  { id: "toast-butter", name: "牛油多士", serving: "1 份", calories: 260, protein: 5 },
  { id: "ham-egg-toast", name: "火腿蛋多士", serving: "1 份", calories: 420, protein: 20 },
  { id: "satay-beef-noodles", name: "沙嗲牛肉麵", serving: "1 碗", calories: 520, protein: 26 },
  { id: "ham-macaroni", name: "火腿通粉", serving: "1 碗", calories: 360, protein: 18 },
  { id: "luncheon-meat-noodles", name: "餐蛋麵", serving: "1 碗", calories: 560, protein: 23 },
  { id: "scrambled-egg-noodles", name: "炒蛋公仔麵", serving: "1 碗", calories: 500, protein: 17 },
  { id: "chicken-rice-plate", name: "雞扒飯", serving: "1 碟", calories: 850, protein: 52 },
  { id: "hainan-chicken-rice", name: "海南雞飯", serving: "1 碟", calories: 820, protein: 45 },
  { id: "beef-brisket-rice", name: "牛腩飯", serving: "1 碟", calories: 760, protein: 38 },
  { id: "char-siu-rice", name: "叉燒飯", serving: "1 碟", calories: 720, protein: 30 },
  { id: "roast-duck-rice", name: "燒鴨飯", serving: "1 碟", calories: 780, protein: 33 },
  { id: "bbq-pork-double-rice", name: "燒味雙拼飯", serving: "1 碟", calories: 920, protein: 40 },
  { id: "minced-pork-rice", name: "蒸肉餅飯", serving: "1 碟", calories: 610, protein: 28 },
  { id: "beef-ho-fun", name: "乾炒牛河", serving: "1 碟", calories: 860, protein: 24 },
  { id: "singapore-noodles", name: "星洲炒米", serving: "1 碟", calories: 740, protein: 18 },
  { id: "chicken-pasta", name: "雞扒意粉", serving: "1 碟", calories: 780, protein: 37 },
  { id: "pasta-tuna", name: "意粉加吞拿魚", serving: "1 份", calories: 620, protein: 34 },
  { id: "steak-potato", name: "牛扒薯仔", serving: "1 份", calories: 680, protein: 42 },
  { id: "soup-noodles-fishball", name: "魚蛋粉", serving: "1 碗", calories: 430, protein: 16 },
  { id: "siu-mai", name: "燒賣", serving: "6 粒", calories: 260, protein: 11 },
  { id: "shrimp-dumpling", name: "蝦餃", serving: "4 粒", calories: 210, protein: 13 },
  { id: "siu-long-bao", name: "小籠包", serving: "6 粒", calories: 330, protein: 14 },
  { id: "vegetables", name: "灼菜", serving: "1 碟", calories: 70, protein: 3 },
  { id: "broccoli", name: "西蘭花", serving: "100g", calories: 34, protein: 2.8 },
  { id: "protein-bar", name: "Protein Bar", serving: "1 條", calories: 210, protein: 20 }
];

const MEAL_SLOTS = [
  { id: "breakfast", label: "早餐" },
  { id: "lunch", label: "午餐" },
  { id: "dinner", label: "晚餐" },
  { id: "snack", label: "小食 / 宵夜" }
];

const DEFAULT_REPORT = {
  energy: "",
  sleepHours: "",
  weight: "",
  steps: "",
  calories: "",
  protein: "",
  activity: "",
  wins: "",
  blockers: "",
  notes: "",
  foods: []
};

const defaultProfile = {
  alias: PLAYER_NICKNAME,
  totalXP: 0,
  streakDays: 0,
  lastCompletedDate: "",
  level: 1
};

const state = normalizeAppState({
  profile: loadJson(STORAGE_KEYS.profile, defaultProfile),
  taskState: loadJson(STORAGE_KEYS.taskState, {}),
  reports: loadJson(STORAGE_KEYS.reports, {}),
  audit: loadJson(STORAGE_KEYS.audit, []),
  drafts: loadJson(STORAGE_KEYS.drafts, {})
});

const cloud = {
  configured: Boolean(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey && window.supabase?.createClient),
  client: null,
  session: null,
  user: null,
  channel: null,
  syncTimer: null,
  pollTimer: null,
  isHydrating: false,
  status: "本機模式",
  detail: "而家資料只會留喺你部裝置。",
  lastSyncedAt: ""
};

const refs = {
  levelValue: document.getElementById("levelValue"),
  rankValue: document.getElementById("rankValue"),
  streakValue: document.getElementById("streakValue"),
  xpValue: document.getElementById("xpValue"),
  xpMeta: document.getElementById("xpMeta"),
  xpBarFill: document.getElementById("xpBarFill"),
  jumpTodayBtn: document.getElementById("jumpTodayBtn"),
  exportAuditBtn: document.getElementById("exportAuditBtn"),
  missionHeading: document.getElementById("missionHeading"),
  dateInput: document.getElementById("dateInput"),
  dayStrip: document.getElementById("dayStrip"),
  dayTitle: document.getElementById("dayTitle"),
  missionTypeBadge: document.getElementById("missionTypeBadge"),
  completionBadge: document.getElementById("completionBadge"),
  calorieTarget: document.getElementById("calorieTarget"),
  proteinTarget: document.getElementById("proteinTarget"),
  dailyXpValue: document.getElementById("dailyXpValue"),
  completionBarFill: document.getElementById("completionBarFill"),
  missionGroups: document.getElementById("missionGroups"),
  activityForm: document.getElementById("activityForm"),
  clearDayBtn: document.getElementById("clearDayBtn"),
  foodSearch: document.getElementById("foodSearch"),
  foodSelect: document.getElementById("foodSelect"),
  mealSelect: document.getElementById("mealSelect"),
  foodServings: document.getElementById("foodServings"),
  addFoodBtn: document.getElementById("addFoodBtn"),
  customFoodMeal: document.getElementById("customFoodMeal"),
  customFoodName: document.getElementById("customFoodName"),
  customFoodCalories: document.getElementById("customFoodCalories"),
  customFoodProtein: document.getElementById("customFoodProtein"),
  addCustomFoodBtn: document.getElementById("addCustomFoodBtn"),
  foodList: document.getElementById("foodList"),
  foodCaloriesValue: document.getElementById("foodCaloriesValue"),
  foodProteinValue: document.getElementById("foodProteinValue"),
  snapshotCount: document.getElementById("snapshotCount"),
  snapshotList: document.getElementById("snapshotList"),
  completedTasksValue: document.getElementById("completedTasksValue"),
  savedReportsValue: document.getElementById("savedReportsValue"),
  auditEventsValue: document.getElementById("auditEventsValue"),
  weeklyCompletionValue: document.getElementById("weeklyCompletionValue"),
  nextActionTitle: document.getElementById("nextActionTitle"),
  nextActionDetail: document.getElementById("nextActionDetail"),
  nextActionCategory: document.getElementById("nextActionCategory"),
  nextActionXp: document.getElementById("nextActionXp"),
  nextActionProgress: document.getElementById("nextActionProgress"),
  auditList: document.getElementById("auditList"),
  taskTemplate: document.getElementById("taskTemplate"),
  authForm: document.getElementById("authForm"),
  authEmail: document.getElementById("authEmail"),
  authSubmitBtn: document.getElementById("authSubmitBtn"),
  signOutBtn: document.getElementById("signOutBtn"),
  cloudStatus: document.getElementById("cloudStatus"),
  cloudDetail: document.getElementById("cloudDetail"),
  cloudMeta: document.getElementById("cloudMeta")
};

let selectedDate = getTodayKey();

initialize();

async function initialize() {
  refs.dateInput.value = selectedDate;
  populateMealSelects();
  populateFoodSelect();
  bindEvents();
  render();
  await initializeCloud();
}

function bindEvents() {
  refs.dateInput.addEventListener("change", (event) => {
    selectedDate = event.target.value || getTodayKey();
    render();
  });
  refs.activityForm.addEventListener("submit", handleReportSave);
  refs.activityForm.addEventListener("input", handleDraftInput);
  refs.clearDayBtn.addEventListener("click", handleDayReset);
  refs.foodSearch.addEventListener("input", handleFoodSearch);
  refs.addFoodBtn.addEventListener("click", handleAddFood);
  refs.addCustomFoodBtn.addEventListener("click", handleAddCustomFood);
  refs.jumpTodayBtn.addEventListener("click", () => {
    selectedDate = getTodayKey();
    refs.dateInput.value = selectedDate;
    render();
  });
  refs.exportAuditBtn.addEventListener("click", exportAudit);
  refs.authForm.addEventListener("submit", handleAuthSubmit);
  refs.signOutBtn.addEventListener("click", handleSignOut);
  window.addEventListener("focus", () => {
    if (cloud.user) {
      hydrateCloudState({ silent: true });
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!cloud.user) {
      return;
    }
    if (document.hidden) {
      saveCloudState({ immediate: true, silent: true });
      return;
    }
    hydrateCloudState({ silent: true });
  });
  window.addEventListener("pagehide", () => {
    if (cloud.user) {
      saveCloudState({ immediate: true, silent: true });
    }
  });
}

async function initializeCloud() {
  if (!cloud.configured) {
    setCloudStatus("未連接 Supabase", "填好 `supabase-config.js` 之後，手機同 desktop 先會同步。");
    renderCloudMeta();
    return;
  }

  cloud.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  cloud.client.auth.onAuthStateChange(async (_event, session) => {
    cloud.session = session;
    cloud.user = session?.user || null;
    if (cloud.user) {
      startRealtimeSubscription();
      startCloudPolling();
      setCloudStatus("雲端已連接", `已登入 ${cloud.user.email || "呢個帳戶"}，會自動同步。`);
      renderCloudMeta();
      await hydrateCloudState();
    } else {
      stopRealtimeSubscription();
      stopCloudPolling();
      setCloudStatus("本機模式", "未登入 Supabase，資料只會留喺呢部裝置。");
      renderCloudMeta();
    }
    render();
  });

  const { data, error } = await cloud.client.auth.getSession();
  if (error) {
    setCloudStatus("Supabase 連接失敗", error.message);
    renderCloudMeta();
    return;
  }

  cloud.session = data.session;
  cloud.user = data.session?.user || null;

  if (cloud.user) {
    startRealtimeSubscription();
    startCloudPolling();
    setCloudStatus("雲端已連接", `已登入 ${cloud.user.email || "呢個帳戶"}，會自動同步。`);
    await hydrateCloudState();
  } else {
    setCloudStatus("未登入 Supabase", "輸入 email 收 magic link，之後你手機同 desktop 會睇到同一份資料。");
  }

  renderCloudMeta();
  render();
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  if (!cloud.client) {
    setCloudStatus("未連接 Supabase", "先填 `supabase-config.js` 先可以登入。");
    renderCloudMeta();
    return;
  }

  const email = refs.authEmail.value.trim();
  if (!email) {
    setCloudStatus("請輸入 email", "用 magic link 登入之後，資料會自動同步。");
    renderCloudMeta();
    return;
  }

  refs.authSubmitBtn.disabled = true;
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await cloud.client.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo }
  });
  refs.authSubmitBtn.disabled = false;

  if (error) {
    setCloudStatus("登入連結送唔到", error.message);
  } else {
    setCloudStatus("Magic link 已送出", `去 ${email} 開信，登入完就會自動同步。`);
  }

  renderCloudMeta();
}

async function handleSignOut() {
  if (!cloud.client) {
    return;
  }

  const { error } = await cloud.client.auth.signOut();
  if (error) {
    setCloudStatus("登出失敗", error.message);
  } else {
    setCloudStatus("已登出", "而家返咗本機模式，資料仍然會保留喺本 browser。");
  }
  renderCloudMeta();
}

async function hydrateCloudState({ silent = false } = {}) {
  if (!cloud.client || !cloud.user) {
    return;
  }

  cloud.isHydrating = true;
  const { data, error } = await cloud.client
    .from(CLOUD_TABLE)
    .select("payload, updated_at")
    .eq("user_id", cloud.user.id)
    .maybeSingle();

  if (error) {
    cloud.isHydrating = false;
    if (!silent) {
      setCloudStatus("載入雲端失敗", error.message);
      renderCloudMeta();
    }
    return;
  }

  if (data?.payload) {
    const hasNewRemoteState = Boolean(data.updated_at && data.updated_at !== cloud.lastSyncedAt);
    if (hasNewRemoteState || !cloud.lastSyncedAt) {
      applyState(normalizeAppState(data.payload));
      persistLocalState();
    }
    cloud.lastSyncedAt = data.updated_at || cloud.lastSyncedAt;
    if (!silent) {
      setCloudStatus("雲端已同步", `已載入 ${cloud.user.email || "你個帳戶"} 嘅最新資料。`);
    }
  } else {
    await saveCloudState({ immediate: true, silent: true });
    if (!silent) {
      setCloudStatus("雲端已初始化", "已將你而家部裝置嘅資料上傳去 Supabase。");
    }
  }

  cloud.isHydrating = false;
  if (!silent) {
    renderCloudMeta();
  }
  render();
}

async function saveCloudState({ immediate = false, silent = false } = {}) {
  if (!cloud.client || !cloud.user || cloud.isHydrating) {
    return;
  }

  const run = async () => {
    cloud.syncTimer = null;
    const payload = serializeState();
    const updatedAt = new Date().toISOString();
    const { error } = await cloud.client.from(CLOUD_TABLE).upsert(
      {
        user_id: cloud.user.id,
        payload,
        updated_at: updatedAt
      },
      { onConflict: "user_id" }
    );

    if (error) {
      if (!silent) {
        setCloudStatus("同步失敗", error.message);
        renderCloudMeta();
      }
      return;
    }

    cloud.lastSyncedAt = updatedAt;
    if (!silent) {
      setCloudStatus("已同步到 Supabase", cloud.user.email || "資料已上雲");
      renderCloudMeta();
    }
  };

  if (immediate) {
    clearTimeout(cloud.syncTimer);
    await run();
    return;
  }

  clearTimeout(cloud.syncTimer);
  cloud.syncTimer = setTimeout(() => {
    run();
  }, 700);
}

function populateMealSelects() {
  const options = MEAL_SLOTS.map((meal) => `<option value="${meal.id}">${meal.label}</option>`).join("");
  refs.mealSelect.innerHTML = options;
  refs.customFoodMeal.innerHTML = options;
  refs.mealSelect.value = "lunch";
  refs.customFoodMeal.value = "dinner";
}

function populateFoodSelect(searchTerm = "") {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredFoods = FOOD_LIBRARY.filter((food) => {
    if (!normalizedSearch) {
      return true;
    }
    return `${food.name} ${food.serving} ${food.id}`.toLowerCase().includes(normalizedSearch);
  });
  const options = filteredFoods.map((food) => {
    return `<option value="${food.id}">${food.name} · ${food.serving} · ${food.calories} kcal · ${food.protein}g 蛋白</option>`;
  }).join("");
  refs.foodSelect.innerHTML = `<option value="">揀一樣食物</option>${options}`;
}

function handleFoodSearch(event) {
  populateFoodSelect(event.target.value);
}

function handleAddFood() {
  const foodId = refs.foodSelect.value;
  const servings = Number(refs.foodServings.value || 0);
  const meal = refs.mealSelect.value || "lunch";

  if (!foodId || servings <= 0) {
    return;
  }

  const food = FOOD_LIBRARY.find((entry) => entry.id === foodId);
  if (!food) {
    return;
  }

  const nextReport = getReportForSelectedDate();
  nextReport.foods.push({
    id: `${food.id}-${Date.now()}`,
    name: food.name,
    meal,
    serving: food.serving,
    servings,
    calories: roundToOne(food.calories * servings),
    protein: roundToOne(food.protein * servings),
    source: "preset"
  });

  syncNutritionFields(nextReport);
  saveDraftReport(nextReport);

  refs.foodSelect.value = "";
  refs.foodServings.value = "1";
  renderActivityForm();
}

function handleAddCustomFood() {
  const name = refs.customFoodName.value.trim();
  const meal = refs.customFoodMeal.value || "dinner";
  const calories = Number(refs.customFoodCalories.value || 0);
  const protein = Number(refs.customFoodProtein.value || 0);

  if (!name) {
    return;
  }

  const nextReport = getReportForSelectedDate();
  nextReport.foods.push({
    id: `custom-${Date.now()}`,
    name,
    meal,
    serving: "自訂",
    servings: 1,
    calories: roundToOne(calories),
    protein: roundToOne(protein),
    source: "custom"
  });

  syncNutritionFields(nextReport);
  saveDraftReport(nextReport);

  refs.customFoodName.value = "";
  refs.customFoodCalories.value = "";
  refs.customFoodProtein.value = "";
  renderActivityForm();
}

async function handleReportSave(event) {
  event.preventDefault();
  const formData = new FormData(refs.activityForm);
  const payload = Object.fromEntries(formData.entries());
  const currentReport = getReportForSelectedDate();
  const report = sanitizeReport(payload, currentReport.foods || []);
  const reportList = state.reports[selectedDate] || [];
  const version = reportList.length + 1;
  const timestamp = new Date().toISOString();
  const entry = {
    id: `${selectedDate}-${Date.now()}`,
    version,
    savedAt: timestamp,
    data: report
  };

  state.reports[selectedDate] = [...reportList, entry];
  state.drafts[selectedDate] = report;
  pushAudit({
    type: "report",
    date: selectedDate,
    title: `已儲存活動快照 第 ${version} 版`,
    detail: summarizeReport(report)
  });
  await persistAllState({ immediate: true });
  render();
}

async function handleDayReset() {
  const hadTasks = Boolean(state.taskState[selectedDate]);
  const hadReports = Array.isArray(state.reports[selectedDate]) && state.reports[selectedDate].length > 0;
  const hadDraft = Boolean(state.drafts[selectedDate]);

  delete state.taskState[selectedDate];
  delete state.reports[selectedDate];
  delete state.drafts[selectedDate];

  recalculateProfileTotals();

  if (hadTasks || hadReports || hadDraft) {
    pushAudit({
      type: "reset",
      date: selectedDate,
      title: "已重設所選日子",
      detail: "已清除呢一日嘅任務勾選、草稿同活動快照。"
    });
  }

  await persistAllState({ immediate: true });
  render();
}

function render() {
  refs.dateInput.value = selectedDate;
  renderCloudMeta();
  renderHeroStats();
  renderNextAction();
  renderDayStrip();
  renderMissionBoard();
  renderActivityForm();
  renderSnapshots();
  renderInsights();
  renderAudit();
}

function renderCloudMeta() {
  refs.cloudStatus.textContent = cloud.status;
  refs.cloudDetail.textContent = cloud.detail;
  refs.cloudMeta.textContent = cloud.user
    ? `${cloud.user.email || "已登入"}${cloud.lastSyncedAt ? ` · 最後同步 ${formatDateTime(cloud.lastSyncedAt)}` : ""}`
    : cloud.configured
      ? "登入後會自動跨裝置同步"
      : "填好 Supabase config 後先會出現雲端同步";

  refs.signOutBtn.hidden = !cloud.user;
  refs.authEmail.disabled = Boolean(cloud.user);
  refs.authSubmitBtn.disabled = Boolean(cloud.user);
}

function renderHeroStats() {
  const rank = getCurrentRank(state.profile.totalXP);
  const nextRank = getNextRank(rank);
  const level = Math.floor(state.profile.totalXP / 180) + 1;

  state.profile.level = level;
  refs.levelValue.textContent = level;
  refs.rankValue.textContent = `${rank.rank} · ${rank.title}`;
  refs.rankValue.style.color = rank.color;
  refs.streakValue.textContent = `${state.profile.streakDays || 0}日`;
  refs.xpValue.textContent = `${state.profile.totalXP} XP`;
  refs.xpMeta.textContent = nextRank
    ? `距離 ${nextRank.rank} 階仲差 ${nextRank.min - state.profile.totalXP} XP`
    : "已到最高階";
  refs.xpBarFill.style.width = `${getRankProgressPercent(rank, nextRank, state.profile.totalXP)}%`;
  refs.xpBarFill.style.background = `linear-gradient(90deg, ${rank.color}, rgba(255,255,255,0.9))`;
}

function renderNextAction() {
  const questData = getSelectedQuest();
  const dateTaskState = state.taskState[selectedDate] || {};
  const tasks = questData.quests.flatMap((group) => {
    return group.tasks.map((task) => ({
      ...task,
      category: group.cat
    }));
  });
  const completedCount = tasks.filter((task) => dateTaskState[task.id]?.done).length;
  const nextTask = tasks.find((task) => !dateTaskState[task.id]?.done);

  if (!nextTask) {
    refs.nextActionTitle.textContent = "今日任務已經清晒";
    refs.nextActionDetail.textContent = "全部完成。可以儲存今日報告，或者切去其他日子預先規劃。";
    refs.nextActionCategory.textContent = questData.type;
    refs.nextActionXp.textContent = "今日完成";
    refs.nextActionProgress.textContent = `${completedCount} / ${tasks.length}`;
    return;
  }

  refs.nextActionTitle.textContent = nextTask.task;
  refs.nextActionDetail.textContent = `${formatReadableDate(selectedDate)} 仲有 ${tasks.length - completedCount} 項未完成，呢項最適合而家即刻做。`;
  refs.nextActionCategory.textContent = nextTask.category;
  refs.nextActionXp.textContent = `+${nextTask.xp} XP`;
  refs.nextActionProgress.textContent = `${completedCount} / ${tasks.length}`;
}

function renderDayStrip() {
  refs.dayStrip.innerHTML = "";
  DAY_KEYS.forEach((key, index) => {
    const quest = WEEKLY_QUESTS[key];
    const currentDate = getDateForWeekday(index, selectedDate);
    const button = document.createElement("button");
    button.className = "day-chip";
    button.type = "button";
    button.dataset.day = key;
    if (key === getWeekdayKey(selectedDate)) {
      button.classList.add("active");
    }
    button.innerHTML = `
      <span>${quest.day}</span>
      <strong>${quest.type}</strong>
      <small>${formatShortDate(currentDate)}</small>
    `;
    button.style.setProperty("--chip-color", quest.color);
    button.addEventListener("click", () => {
      selectedDate = currentDate;
      refs.dateInput.value = selectedDate;
      render();
    });
    refs.dayStrip.appendChild(button);
  });
}

function renderMissionBoard() {
  const questData = getSelectedQuest();
  const dateTaskState = state.taskState[selectedDate] || {};
  const tasks = questData.quests.flatMap((group) => group.tasks);
  const maxXP = tasks.reduce((sum, task) => sum + task.xp, 0);
  const earnedXP = tasks.reduce((sum, task) => sum + (dateTaskState[task.id]?.done ? task.xp : 0), 0);
  const completionPercent = maxXP ? Math.round((earnedXP / maxXP) * 100) : 0;

  refs.missionHeading.textContent = `${formatReadableDate(selectedDate)} 任務`;
  refs.dayTitle.textContent = `${questData.zh} · ${questData.title}`;
  refs.missionTypeBadge.textContent = questData.type;
  refs.missionTypeBadge.style.background = questData.color;
  refs.completionBadge.textContent = `${completionPercent}% 完成`;
  refs.calorieTarget.textContent = questData.calTarget;
  refs.proteinTarget.textContent = `${questData.pTarget}g`;
  refs.dailyXpValue.textContent = `${earnedXP} / ${maxXP}`;
  refs.completionBarFill.style.width = `${completionPercent}%`;
  refs.completionBarFill.style.background = `linear-gradient(90deg, ${questData.color}, rgba(255,255,255,0.85))`;

  refs.missionGroups.innerHTML = "";

  questData.quests.forEach((group) => {
    const wrapper = document.createElement("section");
    wrapper.className = "mission-group";

    const header = document.createElement("header");
    header.className = "group-head";
    header.innerHTML = `<span>${group.icon}</span><h3>${group.cat}</h3>`;
    wrapper.appendChild(header);

    const list = document.createElement("div");
    list.className = "task-list";

    group.tasks.forEach((task) => {
      const fragment = refs.taskTemplate.content.cloneNode(true);
      const checkbox = fragment.querySelector("input");
      const title = fragment.querySelector(".task-title");
      const meta = fragment.querySelector(".task-meta");
      const xp = fragment.querySelector(".task-xp");
      const card = fragment.querySelector(".task-card");
      const isDone = Boolean(dateTaskState[task.id]?.done);

      checkbox.checked = isDone;
      checkbox.addEventListener("change", () => toggleTask(selectedDate, task));
      title.textContent = task.task;
      meta.textContent = task.meta || "冇額外備註";
      xp.textContent = `+${task.xp} XP`;

      if (!task.meta) {
        meta.classList.add("muted");
      }
      if (isDone) {
        card.classList.add("done");
      }

      list.appendChild(fragment);
    });

    wrapper.appendChild(list);
    refs.missionGroups.appendChild(wrapper);
  });
}

function renderActivityForm() {
  refs.activityForm.reset();
  refs.mealSelect.value = "lunch";
  refs.customFoodMeal.value = "dinner";
  const source = getReportForSelectedDate();

  Object.entries(source).forEach(([key, value]) => {
    if (key === "foods") {
      return;
    }
    const field = refs.activityForm.elements.namedItem(key);
    if (field) {
      field.value = value;
    }
  });

  renderFoodLog(source.foods || []);
}

function renderSnapshots() {
  const reports = [...(state.reports[selectedDate] || [])].reverse();
  refs.snapshotCount.textContent = `${reports.length} 個`;
  refs.snapshotList.innerHTML = "";

  if (!reports.length) {
    refs.snapshotList.innerHTML = `<p class="empty-state">${formatReadableDate(selectedDate)} 仲未有活動快照。</p>`;
    return;
  }

  reports.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "snapshot-card";
    article.innerHTML = `
      <div class="snapshot-head">
        <strong>版本 ${entry.version}</strong>
        <span>${formatDateTime(entry.savedAt)}</span>
      </div>
      <p>${summarizeReport(entry.data)}</p>
      ${renderSnapshotFoods(entry.data.foods || [])}
      <div class="snapshot-meta">
        <span>精神 ${entry.data.energy || "-"}</span>
        <span>睡眠 ${entry.data.sleepHours || "-"}</span>
        <span>蛋白 ${entry.data.protein || "-"}</span>
      </div>
    `;
    refs.snapshotList.appendChild(article);
  });
}

function handleDraftInput() {
  const formData = new FormData(refs.activityForm);
  const currentReport = getReportForSelectedDate();
  const nextReport = sanitizeReport(Object.fromEntries(formData.entries()), currentReport.foods || []);
  saveDraftReport(nextReport);
}

function renderFoodLog(foods) {
  const totals = calculateNutritionTotals(foods);
  refs.foodCaloriesValue.textContent = `${formatNumber(totals.calories)} kcal`;
  refs.foodProteinValue.textContent = `${formatNumber(totals.protein)} g`;
  refs.foodList.innerHTML = "";

  if (!foods.length) {
    refs.foodList.innerHTML = `<p class="empty-state">今日未加入任何食物。揀常見食物或者自己手動加都得。</p>`;
    return;
  }

  const groups = groupFoodsByMeal(foods);

  MEAL_SLOTS.forEach((meal) => {
    const mealFoods = groups[meal.id] || [];
    if (!mealFoods.length) {
      return;
    }

    const mealTotals = calculateNutritionTotals(mealFoods.map((entry) => entry.food));
    const section = document.createElement("section");
    section.className = "meal-group";
    section.innerHTML = `
      <div class="meal-group-head">
        <strong>${meal.label}</strong>
        <span>${formatNumber(mealTotals.calories)} kcal · ${formatNumber(mealTotals.protein)}g 蛋白</span>
      </div>
    `;

    const list = document.createElement("div");
    list.className = "meal-food-list";

    mealFoods.forEach(({ food, index }) => {
      const item = document.createElement("article");
      item.className = "food-log-item";
      item.innerHTML = `
        <div class="food-log-copy">
          <strong>${food.name}</strong>
          <div class="food-log-meta">
            <span>${food.serving}</span>
            <span>x ${formatNumber(food.servings)}</span>
            <span>${formatNumber(food.calories)} kcal</span>
            <span>${formatNumber(food.protein)}g 蛋白</span>
          </div>
        </div>
        <button class="food-remove-btn" type="button" data-food-index="${index}">刪除</button>
      `;
      item.querySelector(".food-remove-btn").addEventListener("click", () => removeFood(index));
      list.appendChild(item);
    });

    section.appendChild(list);
    refs.foodList.appendChild(section);
  });
}

function removeFood(index) {
  const nextReport = getReportForSelectedDate();
  nextReport.foods = nextReport.foods.filter((_, foodIndex) => foodIndex !== index);
  syncNutritionFields(nextReport);
  saveDraftReport(nextReport);
  renderActivityForm();
}

function renderInsights() {
  const completedTasks = Object.values(state.taskState).reduce((sum, dateEntry) => {
    return sum + Object.values(dateEntry).filter((task) => task.done).length;
  }, 0);
  const savedReports = Object.values(state.reports).reduce((sum, reports) => sum + reports.length, 0);
  const totalAudit = state.audit.length;
  const weeklyCompletion = getCurrentWeekCompletion();

  refs.completedTasksValue.textContent = completedTasks;
  refs.savedReportsValue.textContent = savedReports;
  refs.auditEventsValue.textContent = totalAudit;
  refs.weeklyCompletionValue.textContent = `${weeklyCompletion}%`;
}

function renderAudit() {
  refs.auditList.innerHTML = "";
  const auditEntries = [...state.audit].reverse();

  if (!auditEntries.length) {
    refs.auditList.innerHTML = `<p class="empty-state">暫時未有 audit 紀錄。你每次剔任務或者儲存報告，都會喺度見到。</p>`;
    return;
  }

  auditEntries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "audit-card";
    article.innerHTML = `
      <div class="audit-head">
        <strong>${entry.title}</strong>
        <span>${formatDateTime(entry.timestamp)}</span>
      </div>
      <p>${entry.detail}</p>
      <div class="audit-meta">
        <span>${formatAuditType(entry.type)}</span>
        <span>${formatReadableDate(entry.date)}</span>
      </div>
    `;
    refs.auditList.appendChild(article);
  });
}

async function toggleTask(dateKey, task) {
  const dateState = { ...(state.taskState[dateKey] || {}) };
  const current = Boolean(dateState[task.id]?.done);
  dateState[task.id] = {
    done: !current,
    toggledAt: new Date().toISOString()
  };
  state.taskState[dateKey] = dateState;

  recalculateProfileTotals();
  pushAudit({
    type: "quest",
    date: dateKey,
    title: `${!current ? "已完成任務" : "取消勾選任務"} · ${task.task}`,
    detail: `${!current ? "加咗" : "扣返"} ${task.xp} XP，日期係 ${formatReadableDate(dateKey)}。`
  });
  await persistAllState({ immediate: true });
  render();
}

function recalculateProfileTotals() {
  let totalXP = 0;
  let lastCompletedDate = "";
  const completedDates = Object.entries(state.taskState)
    .filter(([, tasks]) => Object.values(tasks).some((task) => task.done))
    .map(([date]) => date)
    .sort();

  Object.values(state.taskState).forEach((dateTasks) => {
    Object.entries(dateTasks).forEach(([taskId, taskValue]) => {
      if (taskValue.done) {
        totalXP += TASK_XP_MAP[taskId] || 0;
      }
    });
  });

  if (completedDates.length) {
    lastCompletedDate = completedDates[completedDates.length - 1];
  }

  state.profile.totalXP = totalXP;
  state.profile.lastCompletedDate = lastCompletedDate;
  state.profile.streakDays = getCurrentStreak(completedDates);
}

function pushAudit(entry) {
  state.audit.push({
    id: `${entry.type}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    timestamp: new Date().toISOString(),
    ...entry
  });
  state.audit = state.audit.slice(-300);
}

function getSelectedQuest() {
  return WEEKLY_QUESTS[getWeekdayKey(selectedDate)];
}

function getWeekdayKey(dateKey) {
  const jsDay = new Date(`${dateKey}T12:00:00`).getDay();
  return DAY_KEYS[jsDay === 0 ? 6 : jsDay - 1];
}

function getDateForWeekday(targetIndex, anchorDate) {
  const anchor = new Date(`${anchorDate}T12:00:00`);
  const currentIndex = anchor.getDay() === 0 ? 6 : anchor.getDay() - 1;
  const diff = targetIndex - currentIndex;
  anchor.setDate(anchor.getDate() + diff);
  return formatDateKey(anchor);
}

function getTodayKey() {
  return formatDateKey(new Date());
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatReadableDate(dateKey) {
  return new Intl.DateTimeFormat("zh-HK", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${dateKey}T12:00:00`));
}

function formatShortDate(dateKey) {
  return new Intl.DateTimeFormat("zh-HK", {
    month: "short",
    day: "numeric"
  }).format(new Date(`${dateKey}T12:00:00`));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("zh-HK", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

function buildTaskXpMap() {
  const map = {};
  Object.values(WEEKLY_QUESTS).forEach((day) => {
    day.quests.forEach((group) => {
      group.tasks.forEach((task) => {
        map[task.id] = task.xp;
      });
    });
  });
  return map;
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getReportForSelectedDate() {
  const reports = state.reports[selectedDate] || [];
  const latest = reports[reports.length - 1];
  const draft = state.drafts[selectedDate];
  return normalizeReport(draft || latest?.data || DEFAULT_REPORT);
}

function normalizeReport(source) {
  const report = {
    ...DEFAULT_REPORT,
    ...(source || {})
  };

  report.foods = Array.isArray(report.foods)
    ? report.foods.map((food) => ({
        id: food.id || `food-${Date.now()}`,
        name: food.name || "未命名食物",
        meal: food.meal || "lunch",
        serving: food.serving || "1 份",
        servings: Number(food.servings || 1),
        calories: Number(food.calories || 0),
        protein: Number(food.protein || 0),
        source: food.source || "custom"
      }))
    : [];

  syncNutritionFields(report);
  return report;
}

function saveDraftReport(report) {
  state.drafts[selectedDate] = normalizeReport(report);
  persistAllState();
}

function calculateNutritionTotals(foods) {
  return foods.reduce((totals, food) => {
    totals.calories += Number(food.calories || 0);
    totals.protein += Number(food.protein || 0);
    return totals;
  }, { calories: 0, protein: 0 });
}

function syncNutritionFields(report) {
  const totals = calculateNutritionTotals(report.foods || []);
  report.calories = totals.calories ? String(roundToOne(totals.calories)) : "";
  report.protein = totals.protein ? String(roundToOne(totals.protein)) : "";
}

function getCurrentRank(totalXP) {
  return [...RANKS].reverse().find((rank) => totalXP >= rank.min) || RANKS[0];
}

function getNextRank(rank) {
  const index = RANKS.findIndex((item) => item.rank === rank.rank);
  return RANKS[index + 1];
}

function getRankProgressPercent(rank, nextRank, totalXP) {
  if (!nextRank) {
    return 100;
  }
  return Math.max(0, Math.min(100, ((totalXP - rank.min) / (nextRank.min - rank.min)) * 100));
}

function sanitizeReport(payload, foods = []) {
  const report = {
    energy: payload.energy || "",
    sleepHours: payload.sleepHours || "",
    weight: payload.weight || "",
    steps: payload.steps || "",
    calories: payload.calories || "",
    protein: payload.protein || "",
    activity: (payload.activity || "").trim(),
    wins: (payload.wins || "").trim(),
    blockers: (payload.blockers || "").trim(),
    notes: (payload.notes || "").trim(),
    foods: Array.isArray(foods) ? foods : []
  };

  syncNutritionFields(report);
  return report;
}

function summarizeReport(report) {
  const pieces = [];

  if (report.activity) {
    pieces.push(report.activity);
  }
  if (report.energy) {
    pieces.push(`精神 ${report.energy}/10`);
  }
  if (report.sleepHours) {
    pieces.push(`瞓咗 ${report.sleepHours} 小時`);
  }
  if (report.protein) {
    pieces.push(`蛋白質 ${report.protein}g`);
  }
  if (report.calories) {
    pieces.push(`卡路里 ${report.calories} kcal`);
  }
  if (report.steps) {
    pieces.push(`${Number(report.steps || 0).toLocaleString("en-HK")} 步`);
  }
  if (report.foods?.length) {
    pieces.push(`記錄咗 ${report.foods.length} 樣食物`);
  }

  return pieces.length ? pieces.join(" · ") : "已儲存快照，但未填數據。";
}

function renderSnapshotFoods(foods) {
  if (!foods.length) {
    return "";
  }

  const groups = groupFoodsByMeal(foods);
  const sections = MEAL_SLOTS.map((meal) => {
    const mealFoods = groups[meal.id] || [];
    if (!mealFoods.length) {
      return "";
    }

    const labels = mealFoods.slice(0, 3).map(({ food }) => `<span>${food.name}</span>`).join("");
    const more = mealFoods.length > 3 ? `<span>+${mealFoods.length - 3} 樣</span>` : "";
    return `
      <div class="snapshot-food-group">
        <strong>${meal.label}</strong>
        <div class="snapshot-foods">${labels}${more}</div>
      </div>
    `;
  }).join("");

  return `<div class="snapshot-food-groups">${sections}</div>`;
}

function groupFoodsByMeal(foods) {
  return foods.reduce((groups, food, index) => {
    const mealKey = food.meal || "lunch";
    if (!groups[mealKey]) {
      groups[mealKey] = [];
    }
    groups[mealKey].push({ food, index });
    return groups;
  }, {});
}

function roundToOne(value) {
  return Math.round(value * 10) / 10;
}

function formatNumber(value) {
  const numeric = Number(value || 0);
  if (Number.isInteger(numeric)) {
    return numeric.toLocaleString("en-HK");
  }
  return numeric.toLocaleString("en-HK", { maximumFractionDigits: 1 });
}

function getCurrentStreak(completedDates) {
  if (!completedDates.length) {
    return 0;
  }

  const sorted = [...completedDates].sort().reverse();
  let streak = 0;
  let cursor = new Date(`${getTodayKey()}T12:00:00`);

  for (const dateKey of sorted) {
    const expected = formatDateKey(cursor);
    if (dateKey === expected) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (streak === 0) {
      const yesterday = new Date(`${getTodayKey()}T12:00:00`);
      yesterday.setDate(yesterday.getDate() - 1);
      if (dateKey === formatDateKey(yesterday)) {
        streak += 1;
        cursor = yesterday;
        cursor.setDate(cursor.getDate() - 1);
      }
    }
  }

  return streak;
}

function getCurrentWeekCompletion() {
  const selected = new Date(`${selectedDate}T12:00:00`);
  const dayIndex = selected.getDay() === 0 ? 6 : selected.getDay() - 1;
  const monday = new Date(selected);
  monday.setDate(selected.getDate() - dayIndex);

  let completed = 0;
  let total = 0;

  for (let index = 0; index < 7; index += 1) {
    const current = new Date(monday);
    current.setDate(monday.getDate() + index);
    const dateKey = formatDateKey(current);
    const quest = WEEKLY_QUESTS[getWeekdayKey(dateKey)];
    const taskEntries = state.taskState[dateKey] || {};

    quest.quests.forEach((group) => {
      group.tasks.forEach((task) => {
        total += 1;
        if (taskEntries[task.id]?.done) {
          completed += 1;
        }
      });
    });
  }

  return total ? Math.round((completed / total) * 100) : 0;
}

function exportAudit() {
  const payload = JSON.stringify(state.audit, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `audit-紀錄-${getTodayKey()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function formatAuditType(type) {
  const labels = {
    profile: "檔案",
    report: "報告",
    reset: "重設",
    quest: "任務"
  };
  return labels[type] || type;
}

function normalizeAppState(source) {
  return {
    profile: {
      ...defaultProfile,
      ...(source?.profile || {}),
      alias: PLAYER_NICKNAME
    },
    taskState: source?.taskState && typeof source.taskState === "object" ? source.taskState : {},
    reports: source?.reports && typeof source.reports === "object" ? source.reports : {},
    audit: Array.isArray(source?.audit) ? source.audit.slice(-300) : [],
    drafts: source?.drafts && typeof source.drafts === "object" ? source.drafts : {}
  };
}

function applyState(nextState) {
  state.profile = nextState.profile;
  state.taskState = nextState.taskState;
  state.reports = nextState.reports;
  state.audit = nextState.audit;
  state.drafts = nextState.drafts;
  recalculateProfileTotals();
}

function serializeState() {
  return {
    profile: state.profile,
    taskState: state.taskState,
    reports: state.reports,
    audit: state.audit,
    drafts: state.drafts
  };
}

function persistLocalState() {
  localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(state.profile));
  localStorage.setItem(STORAGE_KEYS.taskState, JSON.stringify(state.taskState));
  localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(state.reports));
  localStorage.setItem(STORAGE_KEYS.audit, JSON.stringify(state.audit));
  localStorage.setItem(STORAGE_KEYS.drafts, JSON.stringify(state.drafts));
}

function persistAllState({ immediate = false } = {}) {
  persistLocalState();
  return saveCloudState({ immediate });
}

function setCloudStatus(status, detail) {
  cloud.status = status;
  cloud.detail = detail;
}

function startRealtimeSubscription() {
  if (!cloud.client || !cloud.user) {
    return;
  }

  stopRealtimeSubscription();

  cloud.channel = cloud.client
    .channel(`app-state-${cloud.user.id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: CLOUD_TABLE,
        filter: `user_id=eq.${cloud.user.id}`
      },
      async (payload) => {
        const nextUpdatedAt = payload.new?.updated_at || payload.old?.updated_at || "";
        if (nextUpdatedAt && nextUpdatedAt === cloud.lastSyncedAt) {
          return;
        }
        await hydrateCloudState({ silent: true });
      }
    )
    .subscribe((status) => {
      if (status === "CHANNEL_ERROR") {
        setCloudStatus("Realtime 連接失敗", "已自動退回輪詢同步。你仍然可以 refresh / 切返個頁面更新資料。");
        renderCloudMeta();
      }
    });
}

function stopRealtimeSubscription() {
  if (!cloud.client || !cloud.channel) {
    return;
  }
  cloud.client.removeChannel(cloud.channel);
  cloud.channel = null;
}

function startCloudPolling() {
  stopCloudPolling();
  cloud.pollTimer = window.setInterval(() => {
    if (!document.hidden && cloud.user) {
      hydrateCloudState({ silent: true });
    }
  }, 15000);
}

function stopCloudPolling() {
  if (cloud.pollTimer) {
    clearInterval(cloud.pollTimer);
    cloud.pollTimer = null;
  }
}
