// __tests__/components/Example.tsx
import React from 'react'
import renderer from 'react-test-renderer'

import { Example } from "../../components/Example"

it("renders correctly with defaults", () => {
  const button = renderer.create(<Example name="World" enthusiasmLevel={1} />).toJSON()
  expect(button).toMatchSnapshot()
})