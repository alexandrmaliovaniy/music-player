import {useState} from 'react';

export const useFormError = (errorFields) => {
    const [fieldStatus, setFieldStatus] = useState(errorFields);
    const IsComplete = () => {
        for (let index in fieldStatus) {
            if (!fieldStatus[index]) return false;
        }
        return true;
    }
    const Set = (reg, input, field) => {
        reg.test()
        setFieldStatus({...fieldStatus, [field]: reg.test(input)});
    }
    const Validate = {
        Email: (fieldName, input) => {
            Set(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, input, fieldName);
        },
        Username: (fieldName, input) => {
            Set(/^[a-zA-Z0-9\s-]+$/, input, fieldName);
        },
        Password: (fieldName, input) => {
            Set(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, input, fieldName);
        },
        ConfirmPassword: (fieldName, input, password) => {
            setFieldStatus({...fieldStatus, [fieldName]: input === password});
        },
        Date: (fieldName, day, month, year) => {
            if (!day || !month || !year) {
                setFieldStatus({...fieldStatus, [fieldName]: false});
                return;
            }
            const date = new Date(Number(year), Number(month), Number(day));
            setFieldStatus({...fieldStatus, [fieldName]: Date.now() > date.getTime()});
        }
        
    }
    return {fieldStatus, setFieldStatus, Validate, IsComplete};
}