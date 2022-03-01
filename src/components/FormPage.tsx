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
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { PREFECTURES } from '../const'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'

type FormInputs = {
  name: string
  contact: 'Email' | 'Phone'
  email: string
  phone: string
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
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<FormInputs>({
    mode: 'all',
    defaultValues: {
      contact: 'Email',
      confirm: false,
    },
  })

  const [values, setValues] = useState<FormInputs>()

  const contactArray = ['Email', 'Phone']
  const watchContact = watch('contact')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    alert(JSON.stringify(data))

  const genderArray = ['Male', 'Female', 'Diverse']
  const [gender, setGender] = useState('')

  const optionArray = ['option1', 'option2', 'option3', 'option4', 'option5']

  const onClick = () => {
    setValues(getValues())
    onOpen()
  }

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

            <FormControl isRequired isInvalid={errors.contact ? true : false}>
              <FormLabel>Contact</FormLabel>
              <RadioGroup value={watchContact} mb={3}>
                <Stack direction="row" spacing={10}>
                  {contactArray.map((v, i) => (
                    <Radio
                      key={i}
                      value={v}
                      isChecked={
                        watchContact ? v === watchContact : v === 'Email'
                      }
                      {...register('contact', {
                        required: {
                          value: true,
                          message: 'Contact is required',
                        },
                      })}
                    >
                      {v}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              {watchContact === 'Email' ? (
                <FormControl isRequired isInvalid={errors.email ? true : false}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<HiOutlineMail />}
                    />
                    <Input
                      type="email"
                      placeholder="guest@example.com"
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'Email or Phone number is requried',
                        },
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'Invalid Email adress',
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
              ) : (
                <FormControl isRequired isInvalid={errors.phone ? true : false}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<HiOutlinePhone />}
                    />
                    <Input
                      type="tel"
                      placeholder="09011223344"
                      {...register('phone', {
                        required: {
                          value: true,
                          message: 'Email or Phone number is requried',
                        },
                        pattern: {
                          value: /[0-9]{10,11}/,
                          message: 'Phone number must be 10 or 11 digits',
                        },
                      })}
                      maxLength={11}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                  </FormErrorMessage>
                </FormControl>
              )}
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

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup value={gender} onChange={(value) => setGender(value)}>
                <Stack direction="row" spacing={10}>
                  {genderArray.map((v, i) => (
                    <Radio
                      key={i}
                      value={v}
                      isChecked={v === gender}
                      {...register('gender')}
                    >
                      {v}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
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
              type="button"
              w="100%"
              colorScheme="teal"
              disabled={!isValid}
              onClick={onClick}
            >
              CONFIRM
            </Button>
          </Stack>

          <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            scrollBehavior="inside"
            size="xl"
          >
            <ModalOverlay
              bg="blackAlpha.300"
              backdropFilter="blur(10px) hue-rotate(90deg)"
            />
            <ModalContent>
              <ModalHeader>Confirm your input</ModalHeader>
              <ModalBody>
                <Stack direction="column">
                  <Text>{values?.name}</Text>
                  <Text>{values?.email}</Text>
                  <Text>{values?.adress}</Text>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button type="button" onClick={onClose} mr={3}>
                  REVISE
                </Button>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                  >
                    SUBMIT
                  </Button>
                </form>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      </Flex>
    </>
  )
}
