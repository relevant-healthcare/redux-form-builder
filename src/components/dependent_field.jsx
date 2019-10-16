import React from 'react'
import formContextWrapper from '../containers/form_context_wrapper'
import formScopedStateWrapper from '../containers/form_scoped_state_wrapper'

function DependentField({ dependentStateValues, shouldRender, ...otherProps }) {
  const localName = otherProps['for'] // ...this is why you don't name args the same thing as language reserved keywords
  if (!shouldRender(...dependentStateValues)) {
    this.props.onChange({ [localName]: undefined })
    return null;
  }

  return (
    <Field
      {...otherProps}
    />
  );
}

export default formScopedStateWrapper((object, { dependsOn }) => ({
  dependentStateValues: dependsOn.map(key => object[key])
}))(formContextWrapper(({ baseRemotePath, baseLocalPath }) => ({ baseRemotePath, baseLocalPath })(DependentField)))
