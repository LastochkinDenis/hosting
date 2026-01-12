'use clinet';
import { IProfileFiz } from "../Profile";
import InputWrapper from "@/Ui/Input/InputWrapper";
import { instance } from "@/lib/axios_settings";
import { useNotificationStore } from "@/store/notificationStrore";
import {
  PROFILES_INDIVIDUAL,
  PROFILES_INDIVIDUAL_DELETE,
  PROFILES_INDIVIDUAL_UPDATE,
} from "@/lib/api_endpoint";

import {
  Form,
  Input,
  Row,
  Col,
  ConfigProvider,
  Select,
  DatePicker,
} from "antd";
import { Rule } from "antd/es/form";
import type { FormProps } from "antd";
import { MaskedInput } from "antd-mask-input";
import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";

type Fields<T> = {
  [P in keyof T as Exclude<P, "created_at" | "updated_at">]: T[P] extends Date ? Dayjs : T[P]
};

type FieldType = Fields<IProfileFiz>;;

interface IProps {
  profile?: IProfileFiz;
  handleUpdate: () => void;
  handleClouseModal?: () => void;
}

export default function ProfileEditorIndividual({ profile, handleUpdate, handleClouseModal}: IProps) {
  const { pushNotification } = useNotificationStore();
  
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {

    const requestProfilesIndividual =
      typeof profile != "undefined"
        ? instance.put(PROFILES_INDIVIDUAL_UPDATE(profile.id.toString()), {
            ...values,
            birth_date: values.birth_date?.format('YYYY-MM-DD') ?? null,
            passport_date: values.passport_date?.format('YYYY-MM-DD') ?? null,
          })
          : instance.post(PROFILES_INDIVIDUAL, {
            ...values,
            birth_date: values.birth_date?.format('YYYY-MM-DD') ?? null,
            passport_date: values.passport_date?.format('YYYY-MM-DD') ?? null,
            is_default: false
        });

    requestProfilesIndividual
    .then(respnse => {
        handleUpdate();
        
        if (typeof handleClouseModal != 'undefined') handleClouseModal();

        pushNotification({
            messeage: `${typeof profile == "undefined" ? "Профиль создан" : "Профиль обновлен"}`,
            type: 'success'
        })
    })
    .catch(e => {
        console.log(e);
        pushNotification({
            messeage: `${typeof profile == "undefined" ? "Ошибка создания профиля" : "Ошибка обновление профиля"}`,
            type: 'error'
        })
    })
  };

  const validatePhone = (rule: Rule, value: string, callback: () => void) => {
    if (!/^\(\+7\) \d{3} \d{3}-\d\d-\d\d/.test(value)) return Promise.reject();

    return Promise.resolve();
  };

  return (
    <Form name="profile-fizl" onFinish={onFinish} validateTrigger="onSubmit">
      <p className="profile-editor-title h3">
        {typeof profile == "undefined" ? "Создание" : "Редактирование"} профилия
        физ.л
      </p>
      <InputWrapper
        label="Название профиля*"
        labelId="profile-fizl-profile_name"
      >
        <Form.Item<FieldType>
          name="profile_name"
          rules={[
            { required: true, message: "Необходимо ввести название профиля" },
          ]}
          initialValue={profile?.profile_name}
        >
          <Input
            type="text"
            placeholder="Название профиля"
            id="profile-fizl-profile_name"
          />
        </Form.Item>
      </InputWrapper>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper label="Имя *" id="profile-fizl-first_name">
            <Form.Item<FieldType>
              name="person_r_name"
              rules={[
                { required: true, message: "Небходимо ввести имя" },
                { max: 50, message: "Максимальный размер имяни 50 символов" },
                { min: 2, message: "Минимальный размер имяни 2 символа" },
              ]}
              initialValue={profile?.person_r_name}
            >
              <Input
                type="text"
                id="profile-fizl-first_name"
                placeholder="Имя"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper label="Фамилия *" id="profile-fizl-person_r_surname">
            <Form.Item<FieldType>
              name="person_r_surname"
              rules={[
                { required: true, message: "Небходимо ввести фамилию" },
                { max: 50, message: "Максимальный размер фимили 50 символов" },
                { min: 2, message: "Минимальный размер фимилии 2 символа" },
              ]}
              initialValue={profile?.person_r_surname}
            >
              <Input
                type="text"
                id="profile-fizl-last_name"
                placeholder="Фамилия"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} lg={8}>
          <InputWrapper label="Отчество" id="profile-fizl-person_r_patronimic">
            <Form.Item<FieldType>
              name="person_r_patronimic"
              rules={[
                {
                  max: 50,
                  message: "Максимальный размер отчества 50 символов",
                },
                { min: 2, message: "Минимальный размер отчества 2 символа" },
              ]}
              initialValue={profile?.person_r_patronimic}
            >
              <Input
                type="text"
                id="profile-fizl-second_name"
                placeholder="Отчество"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24} lg={12}>
          <InputWrapper label="Email *" id="profile-fizl-email">
            <Form.Item<FieldType>
              name="email"
              rules={[
                { required: true, message: "Небходимо ввести email" },
                { type: "email", message: "Некоекртный email" },
                { max: 100, message: "Максимальный размер email 100 символов" },
              ]}
              initialValue={profile?.email}
            >
              <Input id="profile-fizl-email" type="email" placeholder="Email" />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} lg={12}>
          <InputWrapper label="Телефон *" id="profile-fizl-phone">
            <Form.Item<FieldType>
              name="phone"
              rules={[
                { required: true, message: "Небходимо ввести телефон" },
                { validator: validatePhone, message: "Некорректный телефон" },
              ]}
              initialValue={profile?.phone}
            >
              <MaskedInput
                mask={[
                  {
                    mask: "(+7) 000 000-00-00",
                    lazy: false,
                  },
                ]}
                id="profile-fizl-phone"
                type="tel"
                placeholder="Телефон"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <InputWrapper id="profile-fizl-country">
        <Form.Item<FieldType>
          name="country"
          rules={[{ required: true, message: "Небходимо выбрать страну" }]}
          initialValue={
            typeof profile == "undefined" ? "Россия" : profile.country
          }
          hidden
        >
          <Select
            id="profile-fizl-country"
            placeholder="Выберите страну"
            style={{ width: "100%" }}
            options={[
              { label: "Россия", value: "RU" },
            ]}
          />
        </Form.Item>
      </InputWrapper>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper
            label="Серия пасорта"
            id="profile-fizl-passpor_serial_number"
          >
            <Form.Item<FieldType>
              name="passport_series"
              rules={[
                {
                  pattern: /\d{4}/,
                  message: "Некорректная серия паспорта",
                },
              ]}
              initialValue={profile?.passport_series}
            >
              <Input
                type="text"
                id="profile-fizl-passpor_serial_number"
                placeholder="Серия"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper
            label="Номер паспорта"
            id="profile-fizl-passpor_number"
          >
            <Form.Item<FieldType>
              name="passport_number"
              rules={[
                {
                  pattern: /\d{6}/,
                  message: "Некорректный номер паспорта",
                },
              ]}
              initialValue={profile?.passport_number}
            >
              <Input
                type="text"
                id="profile-fizl-passpor_number"
                placeholder="Номер"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper label="Дата рождения" id="profile-fizl-birth_date">
            <Form.Item<FieldType>
              name="birth_date"
              initialValue={typeof profile?.birth_date != undefined && profile?.birth_date != null ? dayjs(profile?.birth_date) : undefined}
            >
              <DatePicker
                id="profile-fizl-birth_date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24} lg={12}>
          <InputWrapper
            label="Дата выдачи паспорта"
            id="profile-fizl-passport_date"
          >
            <Form.Item<FieldType>
              name="passport_date"
              initialValue={typeof profile?.passport_date && profile?.passport_date != null ? dayjs(profile?.passport_date) : undefined}
            >
              <DatePicker
                id="profile-fizl-passport_date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} lg={12}>
          <InputWrapper label="Кем выдан" id="profile-fizl-passport_place">
            <Form.Item<FieldType>
              name="passport_place"
              rules={[
                {
                  max: 255,
                  message: 'Максимальный размер "кем выдан" 255 символов',
                },
              ]}
              initialValue={profile?.passport_place}
            >
              <Input
                type="text"
                placeholder="Кем выдан"
                id="profile-fizl-passport_place"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper label="Индекс" id="profile-fizl-p_addr_zip">
            <Form.Item<FieldType>
              name="p_addr_zip"
              rules={[
                { pattern: /\d+/, message: "Индекс должен состоять из цифр" },
                { len: 6, message: "Индекс должен состоять из 6 цифр" },
              ]}
              initialValue={profile?.p_addr_zip}
            >
              <Input
                type="text"
                id="profile-fizl-p_addr_zip"
                placeholder="Индекс"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} sm={12} lg={8}>
          <InputWrapper label="Город" id="profile-fizl-p_addr_city">
            <Form.Item<FieldType>
              name="p_addr_city"
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер города 255 символов",
                },
                { min: 2, message: "Минимальный размер города 2 символа" },
              ]}
              initialValue={profile?.p_addr_city}
            >
              <Input
                type="text"
                id="profile-fizl-p_addr_city"
                placeholder="Город"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col span={24} lg={8}>
          <InputWrapper label="Область" id="profile-fizl-p_addr_area">
            <Form.Item<FieldType>
              name="p_addr_area"
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер области 255 символов",
                },
                { min: 2, message: "Минимальный размер области 2 символа" },
              ]}
              initialValue={profile?.p_addr_area}
            >
              <Input
                type="text"
                id="profile-fizl-p_addr_area"
                placeholder="Область"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <InputWrapper label="Адрес" id="profile-fizl-p_addr_addr">
        <Form.Item<FieldType>
          name="p_addr_addr"
          rules={[
            { max: 255, message: "Максимальный размер адреса 255 символов" },
            { min: 2, message: "Минимальный размер адреса 2 символа" },
          ]}
          initialValue={profile?.p_addr_addr}
        >
          <Input
            type="text"
            id="profile-fizl-p_addr_addr"
            placeholder="Адрес"
          />
        </Form.Item>
      </InputWrapper>
      <InputWrapper label="Получатель" id="profile-fizl-p_addr_recipient">
        <Form.Item<FieldType>
          name="p_addr_recipient"
          rules={[
            {
              max: 255,
              message: "Максимальный размер получателя 255 символов",
            },
            { min: 2, message: "Минимальный размер получателя 2 символа" },
          ]}
          initialValue={profile?.p_addr_recipient}
        >
          <Input
            type="text"
            id="profile-fizl-p_addr_recipient"
            placeholder="Получатель"
          />
        </Form.Item>
      </InputWrapper>
      <div className="profile__bottom">
        <button className="btn" type="submit">
          Сохранить
        </button>
      </div>
    </Form>
  );
}