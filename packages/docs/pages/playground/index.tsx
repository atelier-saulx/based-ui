import { DisplayComponent } from './displayComponent'

import { Title, Button, Text, Paragraph } from '@based/ui-next'

const Playground = () => {
  const components = [
    <Button key="Button">ButtonText</Button>,
    <Title key="Title">Title</Title>,
    <Text key="Text">Text</Text>,
    <Paragraph fontWeight={'medium'} key="Paragraph">
      Lorem ipsum dolor
    </Paragraph>,
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