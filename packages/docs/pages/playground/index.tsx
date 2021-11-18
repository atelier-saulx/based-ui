import { Title, Button, Text } from '@based/ui-next/dist'
import { DisplayComponent } from './displayComponent'

const Playground = () => {
  const components = [
    <Button key="Button">ButtonText</Button>,
    <Title key="Title">Title</Title>,
    <Text key="Text">Text</Text>,
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
