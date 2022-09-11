import { reactive } from 'vue'

export const tasks = reactive([
  {
    id: '1',
    title: 'Create prototype with JWT authentication',
    state: 'new',
    dueDate: '3 weeks',
    participants: [
      {
        color: 'warning',
        picture: '/vuero/avatars/7.jpg',
      },
    ],
  },
  {
    id: '2',
    title: 'Design a todo list component using React',
    state: 'new',
    dueDate: '3 weeks',
    participants: [
      {
        color: 'info',
        picture: '/images/avatars/svg/vuero-1.svg',
      },
    ],
  },
  {
    id: '3',
    title: 'Implement the users REST API',
    state: 'progress',
    dueDate: '3 days',
    participants: [
      {
        color: 'danger',
        picture: '/vuero/avatars/12.jpg',
      },
      {
        color: undefined,
        picture: '/vuero/avatars/26.jpg',
      },
      {
        color: undefined,
        picture: '/vuero/avatars/19.jpg',
      },
    ],
  },
  {
    id: '4',
    title: 'Review project wireframes',
    state: 'progress',
    dueDate: '1 week',
    participants: [
      {
        color: 'success',
        picture: '/vuero/avatars/13.jpg',
      },
    ],
  },
  {
    id: '5',
    title: 'Implement new footer in all pages',
    state: 'progress',
    dueDate: '5 days',
    participants: [
      {
        color: 'info',
        picture: '/vuero/avatars/16.jpg',
      },
    ],
  },
  {
    id: '6',
    title: 'Implement the projects REST API',
    state: 'ready',
    dueDate: '2 days',
    participants: [
      {
        color: 'warning',
        picture: '/images/avatars/svg/vuero-1.svg',
      },
    ],
  },
  {
    id: '7',
    title: 'Landing page redesign',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'success',
        picture: '/vuero/avatars/12.jpg',
      },
    ],
  },
  {
    id: '8',
    title: 'Projects REST API Implementation',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'danger',
        picture: '/vuero/avatars/18.jpg',
      },
      {
        picture: '/vuero/avatars/9.jpg',
      },
    ],
  },
  {
    id: '9',
    title: 'Database replication setup',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'primary',
        picture: '/vuero/avatars/13.jpg',
      },
    ],
  },
  {
    id: '10',
    title: 'Firebase demo application setup',
    state: 'completed',
    dueDate: 'On time',
    participants: [
      {
        color: 'warning',
        picture: '/vuero/avatars/16.jpg',
      },
    ],
  },
])
