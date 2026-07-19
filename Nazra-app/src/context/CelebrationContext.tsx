import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CelebrationToast } from '../components/CelebrationToast';

/* ─── Bilingual Islamic praise messages ─────────────────────────────────── */
interface CelebrationMessage {
  arabic: string;
  urdu: string;
  english: string;
  emoji: string;
}

const GENERAL_MESSAGES: CelebrationMessage[] = [
  {
    arabic: 'مَاشَاءَ اللَّه',
    urdu: 'بہت خوب! آپ نے بہت اچھا کیا!',
    english: 'MashaAllah! Excellent work!',
    emoji: '⭐',
  },
  {
    arabic: 'سُبْحَانَ اللَّه',
    urdu: 'اللہ آپ کو برکت دے! جاری رکھیں!',
    english: 'SubhanAllah! Keep it up!',
    emoji: '🌟',
  },
  {
    arabic: 'أَحْسَنْتَ',
    urdu: 'شاباش! آپ بہت پیارے اور ہوشیار بچے ہیں!',
    english: 'Excellent! You are so smart!',
    emoji: '✨',
  },
  {
    arabic: 'بَارَكَ اللَّهُ فِيكَ',
    urdu: 'اللہ آپ کے علم میں برکت ڈالے!',
    english: 'May Allah bless you with knowledge!',
    emoji: '🌙',
  },
  {
    arabic: 'جَزَاكَ اللَّهُ خَيْرًا',
    urdu: 'اللہ آپ کو جزائے خیر دے! آگے بڑھتے رہیں!',
    english: 'JazakAllah Khair! Keep moving forward!',
    emoji: '💫',
  },
  {
    arabic: 'اَللّٰهُ أَكْبَر',
    urdu: 'واہ! آپ نے بہت جلدی سیکھ لیا!',
    english: 'Allahu Akbar! You learned this so quickly!',
    emoji: '🌠',
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    urdu: 'الحمدللہ! آپ ایک اچھے طالب علم بن رہے ہیں!',
    english: 'Alhamdulillah! You are becoming a great student!',
    emoji: '⭐',
  },
  {
    arabic: 'تَقَبَّلَ اللَّه',
    urdu: 'اللہ تعالٰی آپ کی یہ کوشش قبول فرمائے!',
    english: 'May Allah accept your beautiful effort!',
    emoji: '🤲',
  },
  {
    arabic: 'اللَّهُمَّ بَارِكْ',
    urdu: 'ماشاءاللہ، اللہ آپ کو ہمیشہ خوش رکھے!',
    english: 'O Allah, bless this wonderful child!',
    emoji: '☀️',
  },
  {
    arabic: 'مَاشَاءَ اللَّه',
    urdu: 'بہت پیارا سبق! آپ کی محنت رنگ لا رہی ہے!',
    english: 'Such a lovely lesson! Your hard work is showing!',
    emoji: '🌸',
  },
];

const WUDU_MESSAGES: CelebrationMessage[] = [
  {
    arabic: 'الطَّهُورُ شَطْرُ الإِيمَانِ',
    urdu: 'پاکیزگی آدھا ایمان ہے! آپ کا وضو کتنا پیارا ہو رہا ہے!',
    english: 'Purity is half of faith! Your Wudu is becoming perfect!',
    emoji: '💧',
  },
  {
    arabic: 'سُبْحَانَ اللَّه',
    urdu: 'وضو کے ہر قطرے پر نیکیاں ملتی ہیں! شاباش!',
    english: 'Every drop of Wudu brings rewards! Great job!',
    emoji: '🌊',
  },
  {
    arabic: 'مَاشَاءَ اللَّه',
    urdu: 'پیارے وضو سے پیاری نماز بنتی ہے! بہت اچھے!',
    english: 'A beautiful Wudu leads to a beautiful prayer!',
    emoji: '🧼',
  },
];

const SALAH_MESSAGES: CelebrationMessage[] = [
  {
    arabic: 'الصَّلَاةُ نُورٌ',
    urdu: 'نماز دل کا نور ہے! آپ نے نماز کا ایک اور طریقہ سیکھ لیا!',
    english: 'Salah is light! You are learning how to talk to Allah!',
    emoji: '🕌',
  },
  {
    arabic: 'قُرَّةُ عَيْنِي فِي الصَّلَاةِ',
    urdu: 'نماز میری آنکھوں کی ٹھنڈک ہے! اللہ آپ کی نماز قبول کرے!',
    english: 'Salah is the coolness of the eyes! May Allah love your prayers!',
    emoji: '🕯️',
  },
  {
    arabic: 'الْحَمْدُ لِلَّهِ',
    urdu: 'نماز کی تیاری! آپ کتنے اچھے بچے ہیں جو نماز سیکھ رہے ہیں!',
    english: 'Getting ready for Salah! You are so good for learning to pray!',
    emoji: '📿',
  },
];

const QURAN_MESSAGES: CelebrationMessage[] = [
  {
    arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ',
    urdu: 'تم میں سے بہتر وہ ہے جو قرآن سیکھے! آپ بہترین بچے ہیں!',
    english: 'The best of you are those who learn the Quran!',
    emoji: '📖',
  },
  {
    arabic: 'نُورٌ عَلَى نُورٍ',
    urdu: 'قرآن پاک پڑھنا کتنا خوبصورت ہے! نور ہی نور!',
    english: 'Reciting Quran is so beautiful! Light upon light!',
    emoji: '✨',
  },
  {
    arabic: 'مَاشَاءَ اللَّه',
    urdu: 'قرآن کے ہر حرف پر ۱۰ نیکیاں ہیں! آپ بہت ساری نیکیاں کما رہے ہیں!',
    english: '10 rewards for every letter of Quran! You are earning so many rewards!',
    emoji: '💎',
  },
];

const MILESTONE_MESSAGES: Record<number, CelebrationMessage> = {
  1: {
    arabic: 'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ',
    urdu: 'آپ کا سفر شروع ہوگیا! اللہ آپ کا ساتھ دے!',
    english: 'Your learning journey has begun! May Allah guide you!',
    emoji: '🌱',
  },
  5: {
    arabic: 'مَاشَاءَ اللَّه — ٥ مکمل!',
    urdu: '۵ چیزیں سیکھ لیں! آپ تو کمال ہیں!',
    english: '5 lessons learnt! You are on fire!',
    emoji: '🔥',
  },
  10: {
    arabic: 'سُبْحَانَ اللَّه — ١٠ مکمل!',
    urdu: '۱۰ سبق! آپ کی محنت قابلِ تعریف ہے!',
    english: '10 lessons done! Your effort is incredible!',
    emoji: '🏆',
  },
  25: {
    arabic: 'اَللّٰهُ أَكْبَر — ٢٥ مکمل!',
    urdu: '۲۵ سبق! آپ سچے طالبِ علم ہیں!',
    english: '25 lessons! You are a true student of knowledge!',
    emoji: '👑',
  },
};

/* ─── Helper function to read current localStorage set ──────────────────── */
function getLearnedSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem('islamic-basics:learned');
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

interface CelebrationState {
  message: CelebrationMessage;
  isMilestone: boolean;
  totalLearned: number;
  unit: string;
}

type CelebrateFn = (id: string, nowLearned: boolean) => void;

const CelebrationContext = createContext<CelebrateFn>(() => {});

export function useCelebrate() {
  return useContext(CelebrationContext);
}

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CelebrationState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMessageRef = useRef<string>('');

  const celebrate = useCallback((id: string, nowLearned: boolean) => {
    // Only celebrate when transitioning from NOT-learned to learned
    if (!nowLearned) return;

    const prefix = id.split(':')[0];
    const unit = (prefix === 'wudu' || prefix === 'salah') ? 'step' : 'lesson';

    const currentSet = getLearnedSet();
    
    // Filter the set to only contain items matching the current category prefix
    const categorySet = new Set(
      Array.from(currentSet).filter((item) => item.startsWith(`${prefix}:`))
    );
    
    const isAlreadyLearned = categorySet.has(id);
    
    // Calculate the correct count of learned items in this specific section
    const total = isAlreadyLearned ? categorySet.size : categorySet.size + 1;

    // Check for milestone first
    const milestoneMsg = MILESTONE_MESSAGES[total];
    
    let message: CelebrationMessage;
    if (milestoneMsg) {
      message = milestoneMsg;
    } else {
      // Build candidate pool based on ID prefix
      let pool: CelebrationMessage[] = [];
      
      if (prefix === 'wudu') {
        pool = [...WUDU_MESSAGES, ...GENERAL_MESSAGES];
      } else if (prefix === 'salah') {
        pool = [...SALAH_MESSAGES, ...GENERAL_MESSAGES];
      } else if (['nazra', 'ayatulKursi', 'duaQunoot'].includes(prefix)) {
        pool = [...QURAN_MESSAGES, ...GENERAL_MESSAGES];
      } else {
        pool = GENERAL_MESSAGES;
      }

      // Filter out the last shown message to avoid consecutive repetitions
      let candidates = pool.filter((m) => m.english !== lastMessageRef.current);
      if (candidates.length === 0) {
        candidates = pool;
      }

      message = candidates[Math.floor(Math.random() * candidates.length)];
      lastMessageRef.current = message.english;
    }

    setState({ message, isMilestone: Boolean(milestoneMsg), totalLearned: total, unit });

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setState(null), 3800);
  }, []);

  return (
    <CelebrationContext.Provider value={celebrate}>
      {children}
      {state && (
        <CelebrationToast
          message={state.message}
          isMilestone={state.isMilestone}
          totalLearned={state.totalLearned}
          unit={state.unit}
          onDismiss={() => setState(null)}
        />
      )}
    </CelebrationContext.Provider>
  );
}
