import {useState} from 'react';

export const useFormError = (errorFields) => {
    const [fieldStatus, setFieldStatus] = useState(errorFields);
    const IsComplete = () => {
        for (let index in fieldStatus) {
            if (fieldStatus[index]?.serverSide) continue;
            if (!fieldStatus[index].status) return false;
        }
        return true;
    }
    const GetError = (error) => {
        const item = fieldStatus[error];
        if (!item) return null;
        return <div className={`${item.status ? "success" : "error"}Message`}>{item.text}</div>
    }
    const Set = (reg, input, field, cb) => {
        const status = reg.test(input)
        setFieldStatus({...fieldStatus, [field]: {
            status: status, 
            text: cb(status)
        }});
    }
    const Validate = {
        Email: (fieldName, input, cb) => {
            Set(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, input, fieldName, cb);
        },
        Username: (fieldName, input, cb) => {
            Set(/^[a-zA-Z0-9\s-]+$/, input, fieldName, cb);
        },
        Password: (fieldName, input, cb) => {
            Set(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, input, fieldName, cb);
        },
        ConfirmPassword: (fieldName, input, password, cb) => {
            const status = input === password;
            setFieldStatus({...fieldStatus, [fieldName]: {status: status, text: cb(status)}});
        },
        Date: (fieldName, day, month, year, cb) => {
            if (!day || !month || !year) {
                setFieldStatus({...fieldStatus, [fieldName]: {status: false, text: cb(false)}});
                return;
            }
            const date = new Date(Number(year), Number(month), Number(day));
            const status = Date.now() > date.getTime();
            setFieldStatus({...fieldStatus, [fieldName]: {status: status, text: cb(status)}});
        }
    }
    return {fieldStatus, setFieldStatus, Validate, IsComplete, GetError};
}