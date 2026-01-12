"use client";
import { IProfileUrl } from "../Profile";
import InputWrapper from "@/Ui/Input/InputWrapper";
import { instance } from "@/lib/axios_settings";
import { useNotificationStore } from "@/store/notificationStrore";
import {
  PROFILES_ORGANIZATION,
  PROFILES_ORGANIZATION_UPDATE,
} from "@/lib/api_endpoint";
import { validatePhone } from "@/lib/validators";
import "./ModalProfileEditor.scss";

import {
  Form,
  Input,
  Row,
  Col,
  ConfigProvider,
  Select,
  DatePicker,
} from "antd";
import type { FormProps } from "antd";
import { MaskedInput } from "antd-mask-input";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface IProps {
  profile?: IProfileUrl;
  handleUpdate: () => void;
  handleClouseModal?: () => void;
}

type FieldType = Omit<IProfileUrl, "created_at" | "updated_at">;

export default function ProfileEditoroOganization({
  profile,
  handleUpdate,
  handleClouseModal,
}: IProps) {
  const { pushNotification } = useNotificationStore();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const requstProfile =
      typeof profile != "undefined"
        ? instance.put(PROFILES_ORGANIZATION_UPDATE(profile.id.toString()), {
            ...values,
          })
        : instance.post(PROFILES_ORGANIZATION, {
            ...values,
            is_default: false,
          });

    requstProfile
      .then((response) => {
        handleUpdate();

        if (typeof handleClouseModal != "undefined") handleClouseModal();

        pushNotification({
          messeage: `${
            typeof profile == "undefined"
              ? "Профиль создан"
              : "Профиль обновлен"
          }`,
          type: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        pushNotification({
          messeage: `${
            typeof profile == "undefined"
              ? "Ошибка создания профиля"
              : "Ошибка обновление профиля"
          }`,
          type: "error",
        });
      });
  };

  return (
    <Form name="profile-url" onFinish={onFinish} validateTrigger="onSubmit">
      <p className="profile-editor-title h3">
        {typeof profile == "undefined" ? "Создание" : "Редактирование"} профилия
        физ.л
      </p>
      <InputWrapper
        label="Название профиля*"
        labelId="profile-fiz-profile_name"
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
            placeholder="Название профиля*"
            id="profile-fiz-profile_name"
          />
        </Form.Item>
      </InputWrapper>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Назвние органицации*"
            labelId="profile-url_org-name"
          >
            <Form.Item<FieldType>
              name="org_name"
              initialValue={profile?.org_name}
              rules={[
                {
                  required: true,
                  message: "Необходимо ввести название организации",
                },
                {
                  max: 255,
                  message:
                    "Масимальный размер названия организации 255 символов",
                },
              ]}
            >
              <Input
                id="profile-url_org-name"
                type="text"
                placeholder="Назвние органицации*"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Регистрационное название организации*"
            labelId="profile-url_org-name-r"
          >
            <Form.Item<FieldType>
              name="org_name_r"
              initialValue={profile?.org_name_r}
              rules={[
                {
                  required: true,
                  message:
                    "Необходимо ввести регистрационное название организации",
                },
                {
                  max: 255,
                  message:
                    "Масимальный размер регистрационного названия организации 255 символов",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Регистрационное название организации*"
                id="profile-url_org-name-r"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col lg={8} sm={12} xs={24}>
          <InputWrapper label="ИНН*" labelId="profile-url_inn">
            <Form.Item<FieldType>
              name="inn"
              initialValue={profile?.inn}
              rules={[
                { required: true, message: "Необходимо ввести инн" },
                { pattern: /\d+/, message: "ИНН должен состоять только из цефр" },
                { len: 12, message: "ИНН должен иметь длину 12" }
              ]}
            >
              <Input id="profile-url_inn" type="text" placeholder="ИНН*" />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={8} sm={12} xs={24}>
          <InputWrapper label="КПП*" labelId="profile-url_kpp">
            <Form.Item<FieldType>
              name="kpp"
              initialValue={profile?.kpp}
              rules={[
                { required: true, message: "Необходимо ввести КПП" },
                { pattern: /\d+/, message: "КПП должен состоять только из цефр" },
                { len: 9, message: "КПП должен иметь длину 9" }
              ]}
            >
              <Input id="profile-url_kpp" type="text" placeholder="КПП*" />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={8} xs={24}>
          <InputWrapper label="ОГРН*" labelId="profile-url_ogrn">
            <Form.Item<FieldType>
              name="ogrn"
              initialValue={profile?.ogrn}
              rules={[
                { required: true, message: "Необходимо ввести ОГРН" },
                { pattern: /\d+/, message: "ОГРН должен состоять только из цефр" },
                { len: 15, message: "КПП должен иметь длину 15" }
              ]}
            >
              <Input id="profile-url_ogrn" type="text" placeholder="ОГРН*" />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper label="Email*" labelId="profile-url_email">
            <Form.Item<FieldType>
              name="email"
              initialValue={profile?.email}
              rules={[
                { required: true, message: "Необходимо ввести email" },
                { type: "email", message: "Некорректный email" },
                {
                  max: 255,
                  message: "Максимальный размер email 255 символов",
                },
              ]}
            >
              <Input id="profile-url_email" type="email" placeholder="Email*" />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper label="Телефон*" labelId="profile-url_phone">
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
                id="profile-url_phone"
                type="tel"
                placeholder="Телефон*"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <InputWrapper labelId="profile-url_country">
        <Form.Item<FieldType>
          name="country"
          initialValue={
            typeof profile == "undefined" ? "Россия" : profile.country
          }
          hidden
        >
          <Select
            id="profile-url-country"
            placeholder="Выберите страну"
            style={{ width: "100%" }}
            options={[{ label: "Россия", value: "RU" }]}
          />
        </Form.Item>
      </InputWrapper>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Юридический индекс*"
            id="profile-url_legal-addr-zip"
          >
            <Form.Item<FieldType>
              name="legal_addr_zip"
              rules={[
                { pattern: /\d+/, message: "Индекс должен состоять из цифр" },
                { len: 6, message: "Индекс должен состоять из 6 цифр" },
                { required: true, message: "Небходимо ввести индекс" },
              ]}
              initialValue={profile?.legal_addr_zip}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-zip"
                placeholder="Индекс*"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Юридическая область*"
            id="profile-url_legal-addr-area"
          >
            <Form.Item<FieldType>
              name="legal_addr_area"
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер области 255 символов",
                },
                { min: 2, message: "Минимальный размер области 2 символа" },
                { required: true, message: "Небходимо ввести область" },
              ]}
              initialValue={profile?.legal_addr_area}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-area"
                placeholder="Область*"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Юридеческий город*"
            labelId="profile-url_legal-addr-city"
          >
            <Form.Item<FieldType>
              name="legal_addr_city"
              initialValue={profile?.legal_addr_city}
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер города 255 символов",
                },
                {
                  required: true,
                  message: "Небходимо ввести город",
                },
              ]}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-city"
                placeholder="Город"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Юридический адресс*"
            labelId="profile-url_legal-addr-addr"
          >
            <Form.Item<FieldType>
              name="legal_addr_addr"
              initialValue={profile?.legal_addr_addr}
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер ареса 255 символов",
                },
                {
                  required: true,
                  message: "Небходимо ввести город",
                },
              ]}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-addr"
                placeholder="Адресс"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper label="Индекс" id="profile-url_p-addr-zip">
            <Form.Item<FieldType>
              name="p_addr_zip"
              rules={[
                { pattern: /\d+/, message: "Индекс должен состоять из цифр" },
                { len: 6, message: "Индекс должен состоять из 6 цифр" },
              ]}
              initialValue={profile?.legal_addr_zip}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-zip"
                placeholder="Индекс"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper label="Область" id="profile-url_p-addr-area">
            <Form.Item<FieldType>
              name="p_addr_area"
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер области 255 символов",
                },
                { min: 2, message: "Минимальный размер области 2 символа" },
              ]}
              initialValue={profile?.legal_addr_area}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-area"
                placeholder="Область"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper label="Город" labelId="profile-url_p-addr-city">
            <Form.Item<FieldType>
              name="p_addr_city"
              initialValue={profile?.legal_addr_city}
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер города 255 символов",
                },
              ]}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-city"
                placeholder="Город"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper label="Адресс" labelId="profile-url_p-addr-addr">
            <Form.Item<FieldType>
              name="p_addr_addr"
              initialValue={profile?.legal_addr_addr}
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер адресса 255 символов",
                },
              ]}
            >
              <Input
                type="text"
                id="profile-url_legal-addr-addr"
                placeholder="Адресс"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Контактное лицо"
            labelId="profile-url_contact-person-name"
          >
            <Form.Item<FieldType>
              name="contact_person_name"
              initialValue={profile?.contact_person_name}
              rules={[
                {
                  max: 255,
                  message: "Максимальный размер контакного лица 255 символов",
                },
              ]}
            >
              <Input
                type="text"
                id="profile-url_contact-person-position"
                placeholder="Контактное лицо"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
        <Col lg={12} span={24}>
          <InputWrapper
            label="Должность контактного лица"
            labelId="profile-url_contact-person-position"
          >
            <Form.Item<FieldType>
              name="contact_person_position"
              initialValue={profile?.contact_person_position}
              rules={[
                {
                  max: 255,
                  message:
                    "Максимальный размер должности контакного лица 255 символов",
                },
              ]}
            >
              <Input
                type="text"
                id="profile-url_contact-person-position"
                placeholder="Должность контактного лица"
              />
            </Form.Item>
          </InputWrapper>
        </Col>
      </Row>
      <div className="profile__bottom">
        <button className="btn" type="submit">
          Сохранить
        </button>
      </div>
    </Form>
  );
}
