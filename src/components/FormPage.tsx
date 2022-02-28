import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { PREFECTURES } from '../const'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'

type FormInputs = {
  name: string
  email: string
  postalCode: string
  prefecture: string
  adress: string
  birthday: Date
  gender: string
  options: Array<string>
  fileUp: File
  message: string
  confirm: boolean
}

export const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({
    mode: 'all',
  })

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  const onSubmit = async (data: FormInputs) => {
    await sleep(1000)
    alert(JSON.stringify(data))
  }

  const genderArray = ['Male', 'Female', 'Diverse']
  const [gender, setGender] = useState('')

  const optionArray = ['option1', 'option2', 'option3', 'option4', 'option5']

  if (isSubmitted)
    return (
      <Alert status="success">
        <AlertIcon />
        Submitted
      </Alert>
    )

  return (
    <>
      <ColorModeSwitcher />
      <Flex direction="column" px="28" pt="10" pb="24">
        <Heading textAlign="center">Form Example</Heading>
        <Divider my="10" />
        <form noValidate>
          <Stack direction="column" spacing={5}>
            <FormControl isRequired isInvalid={errors.name ? true : false}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="name"
                {...register('name', {
                  required: { value: true, message: 'Name is requried' },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.email ? true : false}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="guest@example.com"
                {...register('email', {
                  required: { value: true, message: 'Email is requried' },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Invalid Email adress',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.postalCode ? true : false}>
              <FormLabel>Postal Code</FormLabel>
              <InputGroup>
                <InputLeftAddon children="〒" />
                <Input
                  type="tel"
                  placeholder="1238899"
                  {...register('postalCode', {
                    pattern: {
                      value: /[0-9]{7}/,
                      message: 'Postal code is a number with 7 characters',
                    },
                  })}
                  maxLength={7}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.postalCode && errors.postalCode.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.prefecture ? true : false}>
              <FormLabel>Prefecture</FormLabel>
              <Select
                placeholder="Chose your Prefecture"
                {...register('prefecture')}
              >
                {PREFECTURES.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.prefecture && errors.prefecture.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.adress ? true : false}>
              <FormLabel>Adress</FormLabel>
              <Input
                type="text"
                placeholder="Shibuya, Shibuya-ku, Tokyo"
                {...register('adress')}
              />
              <FormErrorMessage>
                {errors.adress && errors.adress.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.birthday ? true : false}>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" {...register('birthday')} />
              <FormErrorMessage>
                {errors.birthday && errors.birthday.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.gender ? true : false}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup value={gender} onChange={(value) => setGender(value)}>
                <Stack direction="row" spacing={10}>
                  {genderArray.map((v, i) => (
                    <Radio
                      key={i}
                      value={v}
                      isChecked={v === gender}
                      {...register('gender', {
                        required: {
                          value: true,
                          message: 'Gender selection is required',
                        },
                      })}
                    >
                      {v}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.gender && errors.gender.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Options</FormLabel>
              <CheckboxGroup>
                <Stack direction="row" spacing={10}>
                  {optionArray.map((v, i) => (
                    <Checkbox key={i} value={v} {...register('options')}>
                      {v}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl isInvalid={errors.fileUp ? true : false}>
              <FormLabel>Upload File</FormLabel>
              <Input
                type="file"
                variant="unstyled"
                pl="2"
                {...register('fileUp')}
              />
              <FormErrorMessage>
                {errors.fileUp && errors.fileUp.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.message ? true : false}>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Contact message..."
                {...register('message')}
              />
            </FormControl>

            <FormControl isRequired isInvalid={errors.confirm ? true : false}>
              <Flex direction="row" gap={2}>
                <Checkbox
                  defaultChecked={false}
                  {...register('confirm', {
                    required: {
                      value: true,
                      message: 'You must confirm the Privacy Policy',
                    },
                  })}
                />
                <FormLabel mt="2">
                  Please check if you agree with Privacy Policy
                </FormLabel>
              </Flex>
              <FormErrorMessage>
                {errors.confirm && errors.confirm.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              w="100%"
              colorScheme="teal"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Flex>
    </>
  )
}
