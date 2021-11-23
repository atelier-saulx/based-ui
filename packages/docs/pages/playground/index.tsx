import { DisplayComponent } from './displayComponent'

import { Title, Button, Text, Avatar, BasicCard } from '@based/ui-next'

const Playground = () => {
  const components = [
    <Button key="Button">ButtonText</Button>,
    <Title key="Title">Title</Title>,
    <Text key="Text">Text</Text>,
    <Avatar key="Avatar">YO</Avatar>,
    <Avatar
      key="Avatar-image"
      size="medium"
      imageUrl="https://images.unsplash.com/photo-1637599973708-6d41b75ec348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
    />,
    <BasicCard
      key="BasicCard"
      imageUrl="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    >
      <Title fontWeight={'medium'}>Bonjour Senior</Title>
      <Text>Hello Amigo</Text>
    </BasicCard>,
  ]

  return (
    <div
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <Title
        fontWeight="bold"
        style={{
          marginBottom: '20px',
        }}
      >
        Playground
      </Title>

      <div>
        {components.map((component, index) => (
          <DisplayComponent key={`DisplayComponent-${index}`}>
            {component}
          </DisplayComponent>
        ))}
      </div>
    </div>
  )
}

export default Playground
