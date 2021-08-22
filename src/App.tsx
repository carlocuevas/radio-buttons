import React, { useEffect, useState } from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"

type MenuProps = {
  id: string
  value: string  
}

type AppProps = {
  menu?: MenuProps[][] | undefined
  rules?: string[] 
}

type CompatibilityList = {
  [key in string | number]: number[]
}


const App: React.FC<AppProps> = ({ menu, rules }) => {
  const [compatibility, setCompatibility] = useState<CompatibilityList>({})

  const checkCompatibility = (id: string | number, key: number) => {
    if (rules) {
      let updatedCompatibility = compatibility
      const rule: number[] = rules[id] || []
      updatedCompatibility[key] = rule 
      setCompatibility({...compatibility, ...updatedCompatibility})
    }
  }
  
const reset = () => {
  setCompatibility({})
}

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Box minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Grid gap={10} templateColumns={"3"}>
            <Button onClick={reset}>Reset</Button>
            {
              menu?.map((menuContainer, key) => (
                <RadioGroup key={key} 
                  onChange={
                    (e) => checkCompatibility(e, key)
                  }>
                  <Stack>
                    {
                      menuContainer.map((menuItem, menuKey) => (
                        <Radio 
                          value={menuItem.id} 
                          key={menuKey}
                          isDisabled={compatibility[key - 1]?.includes(parseInt(menuItem.id))}
                        >
                          {menuItem.value}
                        </Radio>
                      ))
                    }
                  </Stack>
                </RadioGroup>
              ))
            }
          </Grid>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App