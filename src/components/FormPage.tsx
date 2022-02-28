import {
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { PREFECTURES } from '../const'

type FormInputs = {
  name: string
  email: string
  postCode: string
  prefecture: string
  adress: string
  phoneNumber: string
  selectBox: boolean
  checkBox: Array<string>
  message: string
}

export const FormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  })

  const onSubmit = (data: FormInputs) => {
    alert(JSON.stringify(data))
  }

  return (
    <>
      <ColorModeSwitcher />
      <Flex direction="column" p="10">
        <Heading textAlign="center">Form Example</Heading>
        <Divider my="10" />
        <form noValidate>
          <FormControl isRequired isInvalid={errors.name ? true : false}>
            <FormLabel>Name</FormLabel>
            <Input
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

          <FormControl>
            <FormLabel>Post Code</FormLabel>
            <InputGroup>
              <InputLeftAddon children="〒" />
              <Input
                placeholder="1238899"
                {...register('postCode', {
                  pattern: {
                    value: /[0-9]{7}/,
                    message: 'Post code is 7 characters',
                  },
                  maxLength: 7,
                })}
                maxLength={7}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.postCode && errors.postCode.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
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

          <FormControl>
            <FormLabel>Adress</FormLabel>
            <Input
              placeholder="Shibuya, Shibuya-ku, Tokyo"
              {...register('adress')}
            />
            <FormErrorMessage>
              {errors.adress && errors.adress.message}
            </FormErrorMessage>
          </FormControl>
        </form>
      </Flex>
    </>
  )
}
