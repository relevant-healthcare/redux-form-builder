import React from 'react'
import { Fields, Field } from '../../build/index';

export default function NestedFields() {
  return <Fields for="agencies">
    <Fields for="0" as="">
      <Field for="name" />
    </Fields>
  </Fields>
}
