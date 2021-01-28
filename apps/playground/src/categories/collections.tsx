import RenderComponents from '../RenderComponents'
import { OrderedList } from '@based/ui/Components/Collection/OrderedList'

export default {
  name: 'collections',
  Render: RenderComponents,
  components: [
    {
      name: 'OrderedList',
      category: 'misc',
      Component: OrderedList,
      props: [
        {
          data: [{ title: 'wawa' }],
        },
      ],
    },
  ],
}
