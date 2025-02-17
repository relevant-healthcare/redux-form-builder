import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import MyForm from '../../src/form'
import Greeter from '../../src/greeter'
import ClearNameButton from '../../src/clear_name_button'
import NestedFields from '../../src/nested_fields'
import AdditionalInfoToggle from '../../src/additional_info_toggle'

describe('<MyForm/>', () => {
  const onSubmitSpy = jasmine.createSpy('onSubmit')
  let wrapper, getFormState, simulateChangeEvent

  beforeEach((done) => {
    wrapper = mount(<MyForm onSubmit={onSubmitSpy}/>)
    getFormState = () => {
      return wrapper.find(Provider).props().store.getState().forms.DOG_FORM_KEY
    }

    simulateChangeEvent = (reactWrapper, value) => {
      reactWrapper.simulate('change', { target: { value }})
    }

    const nameInput = wrapper.find('input#dog_owner_name')
    simulateChangeEvent(nameInput, 'Fran')

    const addressInput = wrapper.find('input#dog_owner_address')
    simulateChangeEvent(addressInput, '123 Wallaby Way')

    const dateInput = wrapper.find('input#dog_owner_birthdate')
    simulateChangeEvent(dateInput, '01/01/1990')

    const datePickerInput = wrapper.find('input#dog_owner_special_date')
    datePickerInput.simulate('change', { target: { value: '01/01/2020'} })

    const checkboxInput = wrapper.find('input[type="checkbox"]#dog_owner_glasses')
    checkboxInput.simulate('change', { target: { checked: true }})

    const selectInput = wrapper.find('select#dog_owner_gender')
    simulateChangeEvent(selectInput, 'female')

    const radioButtonInput = wrapper.find('input#dog_owner_plan_basic')
    simulateChangeEvent(radioButtonInput, 'basic')

    const textAreaInput = wrapper.find('textarea#dog_owner_notes')
    simulateChangeEvent(textAreaInput, 'beware cats')

    const interestsInput = wrapper.find('input#dog_owner_interests')
    interestsInput.simulate('change', { target: { value: ['fetch'] }})

    const additionalInfoInput = wrapper.find('textarea#dog_additional_info')
    simulateChangeEvent(additionalInfoInput, 'I like dogs')

    // Necessary because SimpleInput fields debounce input
    setTimeout(done, 300);
  });

  it('updates form state', () => {
    expect(getFormState()).toEqual({
      owner: {
        name: 'Fran',
        address: '123 Wallaby Way',
        birthdate: '01/01/1990',
        special_date: '01/01/2020',
        secret: true,
        glasses: true,
        gender: 'female',
        plan: 'basic',
        notes: 'beware cats',
        interests: ['fetch'],
        agencies: [
          { name: 'Some Agency' }
        ],
      },
      additional_info: 'I like dogs',
      errors: [
        { attribute: "base", message: "test base error" },
        { attribute: "some_other_attribute", message: "test other error" }
      ]
    })
  })

  it('calls onSubmit on form submission', () => {
    wrapper.find('[type="submit"]').simulate('submit')
    expect(onSubmitSpy).toHaveBeenCalled()
  })

  it('updates Greeter component', () => {
    expect(wrapper.find(Greeter).text()).toContain('Fran')
  })

  describe('<AdditionalInfoToggle/>', () => {
    it('removes field from state when unrendered', () => {
      const additionalInfo = wrapper.find(AdditionalInfoToggle)
      additionalInfo.find('button.additional-info-toggle').simulate('click')
      expect(getFormState().additional_info).toBe(null)
    })
  })

  describe('<FakeMultiSelectInput/>', () => {
    it('submits empty array after clearing selection', () => {
      wrapper.find('[type="submit"]').simulate('submit')
      expect(onSubmitSpy).toHaveBeenCalled()
      expect(onSubmitSpy.calls.mostRecent().args[0].target.value.owner.interests).toEqual(['fetch'])

      const interestsInput = wrapper.find('input#dog_owner_interests')
      interestsInput.simulate('change', { target: { value: [] }})

      wrapper.find('[type="submit"]').simulate('submit')
      expect(onSubmitSpy).toHaveBeenCalled()
      expect(onSubmitSpy.calls.mostRecent().args[0].target.value.owner.interests).toEqual([])
    })
  })

  describe('<ClearNameButton/>', () => {
    it('clears name', () => {
      wrapper.find(ClearNameButton).simulate('click')
      expect(getFormState().owner.name).toEqual('')
    })
  })

  describe('<NestedFields />', () => {
    it('generates IDs based on local names rather than remote names', () => {
      const nestedFields = wrapper.find(NestedFields)
      expect(nestedFields.find('input#dog_owner_agencies_0_name').length).toEqual(1)
    })
  })

  describe('checkbox IDs', () => {
    it('only renders one checkbox input with a given ID', () => {
      const myForm = wrapper.find(MyForm)
      expect(myForm.find('input#dog_owner_glasses').length).toEqual(1)
    })
  })

  describe('<ErrorMessages />', () => {
    it('renders base errors', () => {
      const myForm = wrapper.find(MyForm)
      expect(myForm.text()).toContain('test base error')
      expect(myForm.text()).not.toContain('test other error')
    })
  })
})
