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
                  title:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed ultrices est. Mauris tortor metus, fringilla eget turpis in, suscipit facilisis ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit id risus sed pharetra. Vestibulum ante velit, posuere eget auctor nec, scelerisque ut tortor. Duis rhoncus mauris tincidunt magna mattis pretium. Etiam sit amet ipsum quis justo condimentum vulputate ac sed eros. Vivamus pretium finibus leo ac suscipit. Cras sit amet tortor in augue ultrices fringilla non at metus. Nullam mattis eleifend nisi quis aliquam. Vestibulum a euismod nibh. Sed vitae ligula nulla.disable',
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
