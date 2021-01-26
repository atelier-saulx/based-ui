import { FileUpload, Loader, ProgressIndicator, SideMenu } from '@based/ui'
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
              title: 'Shows',
              icon: 'Shows',
              active: true,
            },
            {
              title: 'Dashboard',
              icon: 'Dashboard',
            },
            {
              title: 'Settings',
              icon: 'Settings',
            },
            {
              title: 'SubItems',
              children: [
                {
                  title: 'Subitem 1',
                  icon: 'Custom',
                },
                {
                  title: 'Subitem 2',
                  icon: 'Custom',
                },
                {
                  title: 'Subitem 3',
                  icon: 'Custom',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'FileUpload',
      category: 'misc',
      Component: FileUpload,
      props: [
        {
          value: 'This is value',
          fake: true,
        },
      ],
    },
  ],
}
