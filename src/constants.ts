import { InterviewerPersona } from './types';

export const INTERVIEWER_PERSONAS: InterviewerPersona[] = [
  {
    id: 'professional',
    name: '严谨专业型',
    type: 'professional',
    description: '这种形象会让候选人感到面试的严肃性，有助于筛选出在高压下仍能保持稳健表现的选手。',
    roleDescription: '资深技术专家 / 部门主管',
    image: 'https://picsum.photos/seed/pro-interviewer/1200/800',
    greeting: '你好。我是今天的面试官。我们将进行一次深入的技术与综合能力评估。请准备好，我们现在开始。'
  },
  {
    id: 'approachable',
    name: '亲和力 HR 型',
    type: 'approachable',
    description: '侧重于缓解候选人的紧张情绪，更像是一个引导者。鼓励候选人多表达真实自我。',
    roleDescription: '资深 HRBP / 团队引导者',
    image: 'https://picsum.photos/seed/hr-interviewer/1200/800',
    greeting: '你好！很高兴见到你。放轻松，今天的面试主要是想更深入地了解你的经历和想法。我们可以像聊天一样开始。'
  },
  {
    id: 'tech',
    name: '科技极客型',
    type: 'tech',
    description: '强调创新、效率和未来感。传达出平等、扁平化的沟通氛围，吸引追求创新的年轻人才。',
    roleDescription: '技术架构师 / 创新教练',
    image: 'https://picsum.photos/seed/tech-interviewer/1200/800',
    greeting: '嘿，你好。我是负责这次技术交流的。我们这儿比较扁平，你可以直接分享你的项目干货和技术见解。'
  }
];
