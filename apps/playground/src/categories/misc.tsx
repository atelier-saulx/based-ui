import { Loader, ProgressIndicator, SideMenu } from '@based/ui'
import RenderComponents from '../RenderComponents'

export default {
  name: 'misc',
  Render: RenderComponents,
  components: [
    {
      name: 'Loader',
      category: 'misc',
      Component: Loader,
      props: [{ fadeIn: true }],
    },
    {
      name: 'ProgressIndicator',
      category: 'misc',
      Component: ProgressIndicator,
      props: [{ value: 40 }],
    },
    {
      name: 'SideMenu',
      category: 'sidemenu',
      Component: SideMenu,
      props: [
        {
          children: [
            {
              title: 'Item 1',
              icon: 'Shows',
            },
            {
              title: 'Item 2',
              icon: 'Date',
            },
            {
              title: 'Item 3',
              icon: 'Register',
            },
          ],
        },
      ],
    },
  ],
}
