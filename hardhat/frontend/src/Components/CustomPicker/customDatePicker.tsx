import moment from 'moment';
import { DatePicker, Space } from 'antd';
import {useState} from "react";

const { RangePicker } = DatePicker;

function range(start : number, end: number) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    };
}

function disabledRangeTime(_: any, type :any ) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
}

export default function CustomDatePicker () {
    return <DatePicker format="YYYY-MM-DD HH:mm:ss"
                       placeholder="End time for your proposal"
                       disabledDate={disabledDate}
                       disabledTime={disabledDateTime}
                       showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
}
