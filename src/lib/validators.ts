import { Rule } from "antd/es/form";

export const validatePhone = (rule: Rule, value: string, callback: () => void) => {
    if (!/^\(\+7\) \d{3} \d{3}-\d\d-\d\d/.test(value)) return Promise.reject();

    return Promise.resolve();
};