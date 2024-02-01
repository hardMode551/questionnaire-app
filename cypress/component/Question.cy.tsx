import React from 'react'
import { mount } from '@cypress/react18';
import Question  from '../../src/components/Question'

import '../../src/styles/index.css';

describe('<Question />', () => {
  it('mounts', () => {
    mount(<Question text="Test Question" difficulty="easy" />)
    cy.get('[data-testid="question-text"]').should('be.visible')
  })
})