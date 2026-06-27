import  {SettingSwitch, SettingSwitchInfo } from '@/components/ui/Checkbox/SettingCheckBox'
import { Box, Switch } from '@mui/material'
import React from 'react'

function page() {
  return (

<SettingSwitch>
  <Switch/>
  <SettingSwitchInfo
    title="ورود با گوگل"
    description="نیییییییییییییییییییییییییییییییی"
  />
</SettingSwitch>
  )
}

export default page