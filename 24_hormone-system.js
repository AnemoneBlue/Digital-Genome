/**
 * 💊 Hormone System
 * Endocrine system and hormonal regulation
 */

class HormoneSystem {
  constructor() {
    this.hormones = this.initializeHormones();
    this.glands = this.initializeGlands();
  }

  initializeHormones() {
    return {
      // Stress hormones
      cortisol: {
        name: 'Cortisol',
        gland: 'adrenal',
        type: 'glucocorticoid',
        baseline: 15, // mcg/dL
        function: 'stress response, metabolism, immune',
        receptors: ['glucocorticoid', 'mineralocorticoid']
      },
      adrenaline: {
        name: 'Adrenaline',
        gland: 'adrenal',
        type: 'catecholamine',
        baseline: 50, // pg/mL
        function: 'fight or flight, heart rate, blood pressure',
        receptors: ['alpha', 'beta']
      },
      noradrenaline: {
        name: 'Noradrenaline',
        gland: 'adrenal',
        type: 'catecholamine',
        baseline: 300, // pg/mL
        function: 'arousal, attention',
        receptors: ['alpha', 'beta']
      },

      // Sex hormones
      testosterone: {
        name: 'Testosterone',
        gland: 'gonads',
        type: 'androgen',
        baseline: 600, // ng/dL
        function: 'muscle, bone, libido, mood',
        receptors: ['AR']
      },
      estrogen: {
        name: 'Estrogen',
        gland: 'gonads',
        type: 'steroid',
        baseline: 100, // pg/mL
        function: 'reproduction, bone, brain',
        receptors: ['ER-alpha', 'ER-beta']
      },
      progesterone: {
        name: 'Progesterone',
        gland: 'gonads',
        type: 'steroid',
        baseline: 5, // ng/mL
        function: 'pregnancy, mood',
        receptors: ['PR']
      },

      // Thyroid hormones
      t3: {
        name: 'Triiodothyronine',
        gland: 'thyroid',
        type: 'thyroid',
        baseline: 100, // ng/dL
        function: 'metabolism, growth, development',
        receptors: ['TR-alpha', 'TR-beta']
      },
      t4: {
        name: 'Thyroxine',
        gland: 'thyroid',
        type: 'thyroid',
        baseline: 8, // mcg/dL
        function: 'metabolism precursor',
        receptors: ['TR-alpha', 'TR-beta']
      },

      // Growth and metabolism
      growthHormone: {
        name: 'Growth Hormone',
        gland: 'pituitary',
        type: 'peptide',
        baseline: 5, // ng/mL
        function: 'growth, cell reproduction, regeneration',
        receptors: ['GHR']
      },
      insulin: {
        name: 'Insulin',
        gland: 'pancreas',
        type: 'peptide',
        baseline: 10, // mIU/L
        function: 'glucose uptake, energy storage',
        receptors: ['IR']
      },
      glucagon: {
        name: 'Glucagon',
        gland: 'pancreas',
        type: 'peptide',
        baseline: 50, // pg/mL
        function: 'glucose release, energy mobilization',
        receptors: ['GCGR']
      },

      // Brain hormones
      dopamine: {
        name: 'Dopamine',
        gland: 'brain',
        type: 'catecholamine',
        baseline: 10, // ng/mL
        function: 'reward, motivation, movement',
        receptors: ['D1', 'D2']
      },
      serotonin: {
        name: 'Serotonin',
        gland: 'brain',
        type: 'indoleamine',
        baseline: 100, // ng/mL
        function: 'mood, sleep, appetite',
        receptors: ['5-HT']
      },

      // Other
      melatonin: {
        name: 'Melatonin',
        gland: 'pineal',
        type: 'amine',
        baseline: 10, // pg/mL
        function: 'circadian rhythm, sleep',
        receptors: ['MT1', 'MT2']
      },
      vasopressin: {
        name: 'Vasopressin',
        gland: 'pituitary',
        type: 'peptide',
        baseline: 2, // pg/mL
        function: 'water retention, blood pressure',
        receptors: ['V1', 'V2']
      }
    };
  }

  initializeGlands() {
    return {
      hypothalamus: { hormones: ['CRH', 'TRH', 'GHRH'], target: 'pituitary' },
      pituitary: { hormones: ['GH', 'ACTH', 'TSH', 'FSH', 'LH'], target: 'body' },
      thyroid: { hormones: ['T3', 'T4'], target: 'metabolism' },
      adrenal: { hormones: ['cortisol', 'adrenaline'], target: 'stress' },
      pancreas: { hormones: ['insulin', 'glucagon'], target: 'glucose' },
      gonads: { hormones: ['testosterone', 'estrogen'], target: 'reproduction' },
      pineal: { hormones: ['melatonin'], target: 'sleep' }
    };
  }

  // Release hormone
  release(hormone, amount = 1.0) {
    const h = this.hormones[hormone];
    if (!h) return null;

    const released = {
      hormone,
      name: h.name,
      gland: h.gland,
      amount: h.baseline * amount,
      baseline: h.baseline,
      function: h.function,
      receptors: h.receptors
    };

    return released;
  }

  // Hormone cascade
  cascade(trigger) {
    const cascades = {
      stress: ['hypothalamus', 'pituitary', 'adrenal'],
      sleep: ['hypothalamus', 'pineal'],
      growth: ['hypothalamus', 'pituitary', 'liver'],
      reproduction: ['hypothalamus', 'pituitary', 'gonads']
    };

    return {
      trigger,
      pathway: cascades[trigger] || [],
      duration: trigger === 'stress' ? 'hours' : 
               trigger === 'growth' ? 'years' : 'daily'
    };
  }

  // Feedback loops
  getFeedback(hormone) {
    const feedbacks = {
      cortisol: { type: 'negative', effect: 'suppress CRH' },
      insulin: { type: 'negative', effect: 'suppress glucagon' },
      testosterone: { type: 'negative', effect: 'suppress FSH/LH' },
      estrogen: { type: 'negative', effect: 'suppress FSH/LH' },
      thyroid: { type: 'negative', effect: 'suppress TSH' }
    };

    return feedbacks[hormone] || { type: 'none' };
  }

  // Circadian rhythm
  getCircadianRhythm(hour) {
    return {
      cortisol: hour >= 6 && hour <= 8 ? 'peak' : hour >= 20 ? 'low' : 'normal',
      melatonin: hour >= 22 || hour <= 4 ? 'high' : hour >= 10 ? 'low' : 'rising',
      growthHormone: hour >= 22 || hour <= 2 ? 'peak' : 'low',
      serotonin: hour >= 6 && hour <= 18 ? 'high' : 'low'
    };
  }

  // Hormone interaction (synergy/antagonism)
  getInteraction(hormone1, hormone2) {
    const interactions = {
      'cortisol-insulin': { type: 'antagonistic', effect: 'opposing glucose regulation' },
      'testosterone-estrogen': { type: 'balance', effect: 'sex hormone equilibrium' },
      'melatonin-serotonin': { type: 'precursor', effect: 'melatonin from serotonin' },
      'adrenaline-cortisol': { type: 'synergistic', effect: 'stress response' }
    };

    const key = `${hormone1}-${hormone2}`;
    return interactions[key] || interactions[`${hormone2}-${hormone1}`] || { type: 'none' };
  }

  getHormoneLevels() {
    const levels = {};
    for (const [key, h] of Object.entries(this.hormones)) {
      levels[key] = h.baseline;
    }
    return levels;
  }
}

module.exports = new HormoneSystem();
