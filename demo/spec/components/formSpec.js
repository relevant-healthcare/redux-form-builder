import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import MyForm from '../../src/form'
import Greeter from '../../src/greeter'
import ClearNameButton from '../../src/clear_name_button'

describe('<MyForm/>', () => {
  const onSubmitSpy = jasmine.createSpy('onSubmit')
  const wrapper = mount(<MyForm onSubmit={onSubmitSpy}/>)
  const getFormState = () => {
    return wrapper.find(Provider).props().store.getState().forms.DOG_FORM_KEY
  }

  const simulateChangeEvent = (reactWrapper, value) => {
    reactWrapper.simulate('change', { target: { value }})
  }

  beforeEach((done) => {
    const nameInput = wrapper.find('input#dog_owner_name')
    simulateChangeEvent(wrapper.find('input#dog_owner_name'), 'Fran')

    const addressInput = wrapper.find('input#dog_owner_address')
    simulateChangeEvent(addressInput, '123 Wallaby Way')

    const dateInput = wrapper.find('input#dog_owner_birthdate')
    simulateChangeEvent(dateInput, '01/01/1990')

    const checkboxInput = wrapper.find('input[type="checkbox"]#dog_owner_glasses')
    checkboxInput.simulate('change', { target: { checked: true }})

    const selectInput = wrapper.find('select#dog_owner_gender')
    simulateChangeEvent(selectInput, 'female')

    const radioButtonInput = wrapper.find('input#dog_owner_plan_basic')
    simulateChangeEvent(radioButtonInput, 'basic')

    const textAreaInput = wrapper.find('textarea#dog_owner_notes')
    simulateChangeEvent(textAreaInput, 'beware cats')

    // Necessary because SimpleInput fields debounce input
    setTimeout(done, 300);
  });

  it('updates form state', () => {
    expect(getFormState().owner).toEqual({
      name: 'Fran',
      address: '123 Wallaby Way',
      birthdate: '01/01/1990',
      secret: true,
      glasses: true,
      gender: 'female',
      plan: 'basic',
      notes: 'beware cats'
    })
  })

  it('calls onSubmit on form submission', () => {
    wrapper.find('[type="submit"]').simulate('submit')
    expect(onSubmitSpy).toHaveBeenCalled()
  })

  it('updates Greeter component', () => {
    expect(wrapper.find(Greeter).text()).toContain('Fran')
  })

  describe('<ClearNameButton/>', () => {
    it('clears name', () => {
      wrapper.find(ClearNameButton).simulate('click')
      expect(getFormState().owner.name).toEqual('')
    })
  })
})
