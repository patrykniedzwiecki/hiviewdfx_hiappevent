/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import hiAppEvent from "@ohos.hiAppEvent"

import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('HiAppEventJsTest', function () {
    beforeAll(function() {
        /*
         * @tc.setup: setup invoked before all test cases
         */
        console.info('HiAppEventJsTest beforeAll called')
    })

    afterAll(function() {
        /*
         * @tc.teardown: teardown invoked after all test cases
         */
        console.info('HiAppEventJsTest afterAll called')
    })

    beforeEach(function() {
        /*
         * @tc.setup: setup invoked before each test case
         */
        console.info('HiAppEventJsTest beforeEach called')
    })

    afterEach(function() {
        /*
         * @tc.teardown: teardown invoked after each test case
         */
        console.info('HiAppEventJsTest afterEach called')
    })

    function simpleTrigger(curRow, curSize, holder) {
        console.info("HiAppEventJsTest onTrigger curRow=" + curRow);
        console.info("HiAppEventJsTest onTrigger curSize=" + curSize);
        if (holder == null) {
            console.info("HiAppEventJsTest onTrigger holder is null");
        }
    }

    /**
     * @tc.name: HiAppEventJsTest001
     * @tc.desc: Test the write interface using callback.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest001', 0, async function (done) {
        console.info('HiAppEventJsTest001 start');
        let name = "name_test1";
        let type = hiAppEvent.EventType.BEHAVIOR;
        let params = {
            "key_int": 100,
            "key_string": "strValue",
            "key_bool": true,
            "key_float": 30949.374,
            "key_int_arr": [1, 2, 3],
            "key_string_arr": ["a", "b", "c"],
            "key_float_arr": [1.1, 2.2, 3.0],
            "key_bool_arr": [true, false, true]
        };
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(0);
            done();
            console.info('HiAppEventJsTest001_1 end');
        });

        let domain = "domain_test1";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(0);
            done();
            console.info('HiAppEventJsTest001_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest002
     * @tc.desc: Test the write interface using promise.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest002', 0, async function (done) {
        console.info('HiAppEventJsTest002 start');
        let name = "name_test2";
        let type = hiAppEvent.EventType.FAULT;
        let params = {};
        hiAppEvent.write(name, type, params).then((value) => {
            let result = value;
            expect(result).assertEqual(0);
            done()
            console.info('HiAppEventJsTest002_1 end');
        }).catch((err) => {
            let result = err.code;
            expect(result).assertEqual(0);
            done()
            console.info('HiAppEventJsTest002_2 end');
        });


        let domain = "domain_test2";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo).then((value) => {
            let result = value;
            expect(result).assertEqual(0);
            done()
            console.info('HiAppEventJsTest002_3 end');
        }).catch((err) => {
            let result = err.code;
            expect(result).assertEqual(0);
            done()
            console.info('HiAppEventJsTest002_4 end');
        });
        expect(result).assertEqual(0);
    });

    /**
     * @tc.name: HiAppEventJsTest003
     * @tc.desc: Error code 1 is returned when the event has an invalid key name.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest003', 0, async function (done) {
        console.info('HiAppEventJsTest003 start');
        let name = "name_test3";
        let type = hiAppEvent.EventType.STATISTIC;
        let params = {
            "**":"ha",
            "key_int":1,
            "HH22":"ha",
            "key_str":"str",
            "":"empty",
            "aa_":"underscore"
        };
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(1)
            done()
            console.info('HiAppEventJsTest003_1 end');
        });

        let domain = "domain_test3";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(1)
            done()
            console.info('HiAppEventJsTest003_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest004
     * @tc.desc: Error code 3 is returned when the event has an invalid value type.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest004', 0, async function (done) {
        console.info('HiAppEventJsTest004 start');
        let name = "name_test4";
        let type = hiAppEvent.EventType.SECURITY;
        let params = {
            key_1_invalid: {},
            key_2_invalid: null,
            key_str: "str"
        };
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(3)
            done()
            console.info('HiAppEventJsTest004_1 end');
        });

        let domain = "domain_test4";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(3)
            done()
            console.info('HiAppEventJsTest004_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest005
     * @tc.desc: Error code 4 is returned when the event has an invalid string length.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest005', 0, async function (done) {
        console.info('HiAppEventJsTest005 start');
        let longStr = "a".repeat(8 * 1024);
        let invalidStr = "a".repeat(8 * 1024 + 1);
        let name = "name_test5";
        let type = hiAppEvent.EventType.SECURITY;
        let params = {
            key_long: longStr,
            key_i_long: invalidStr,
            key_long_arr: ["ha", longStr],
            key_i_long_arr: ["ha", invalidStr],
            key_str: "str"
        };
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(4)
            done()
            console.info('HiAppEventJsTest005_1 end');
        });

        let domain = "domain_test5";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(4)
            done()
            console.info('HiAppEventJsTest005_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest006
     * @tc.desc: Error code 5 is returned when the event has too many params.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest006', 0, async function (done) {
        console.info('HiAppEventJsTest006 start');
        let name = "name_test6";
        let type = hiAppEvent.EventType.SECURITY;
        let params = {};
        for (var i = 1; i <= 33; i++) {
            params["key" + i] = "value" + i;
        }
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(5)
            done()
            console.info('HiAppEventJsTest006_1 end');
        });

        let domain = "domain_test6";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(5)
            done()
            console.info('HiAppEventJsTest006_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest007
     * @tc.desc: Error code 6 is returned when there is an array with too many elements.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest007', 0, async function (done) {
        console.info('HiAppEventJsTest007 start');
        let longArr = new Array(100).fill(1);
        let iLongArr = new Array(101).fill("a");
        let name = "name_test7";
        let type = hiAppEvent.EventType.SECURITY;
        let params = {
            key_long_arr: longArr,
            key_i_long_arr: iLongArr,
            key_str: "str"
        };
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(6)
            done()
            console.info('HiAppEventJsTest007_1 end');
        });

        let domain = "domain_test7";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(6)
            done()
            console.info('HiAppEventJsTest007_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest008
     * @tc.desc: Error code 7 is returned when there is an array with inconsistent or illegal parameter types.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest008', 0, async function (done) {
        console.info('HiAppEventJsTest008 start');
        let name = "name_test8";
        let type = hiAppEvent.EventType.SECURITY;
        let params = {
            key_arr_null: [null, null],
            key_arr_obj: [{}],
            key_arr_not_same1:[true, "ha"],
            key_arr_not_same2:[123, "ha"],
            key_str: "str"
        };
        hiAppEvent.write(name, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(7)
            done()
            console.info('HiAppEventJsTest008_1 end');
        });

        let domain = "domain_test8";
        let eventInfo = {
            domain: domain,
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(7)
            done()
            console.info('HiAppEventJsTest008_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest009
     * @tc.desc: Error code -1 is returned when the event has invalid event name.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest009', 0, async function (done) {
        console.info('HiAppEventJsTest009 start');
        let type = hiAppEvent.EventType.STATISTIC;
        let params = {};
        hiAppEvent.write("verify_test_1.**1", type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-1)
            done()
            console.info('HiAppEventJsTest009_1 end');
        });

        hiAppEvent.write("VVV", type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-1)
            done()
            console.info('HiAppEventJsTest009_2 end');
        });

        let eventInfo = {
            domain: "domain_test9",
            name: "",
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-1)
            done()
            console.info('HiAppEventJsTest009_3 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest010
     * @tc.desc: Error code -2 is returned when the event has invalid eventName type, eventType type, keyValues type.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsTest010', 0, async function (done) {
        console.info('HiAppEventJsTest010 start');
        let type = hiAppEvent.EventType.STATISTIC;
        let params = {};
        hiAppEvent.write(null, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-2)
            done()
            console.info('HiAppEventJsTest010_1 end');
        });
        hiAppEvent.write(123, type, params, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-2)
            done()
            console.info('HiAppEventJsTest010_2 end');
        });

        let domain = "domain_test10";
        let name = "name_test10";
        let eventInfo1 = {
            domain: domain,
            name: name,
            eventType: "invalid type",
            params: params
        };
        hiAppEvent.write(eventInfo1, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-2)
            done()
            console.info('HiAppEventJsTest010_3 end');
        });

        let eventInfo2 = {
            domain: domain,
            name: name,
            eventType: null,
            params: params
        };
        hiAppEvent.write(eventInfo2, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-2)
            done()
            console.info('HiAppEventJsTest010_4 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest011
     * @tc.desc: Error code -3 is returned when the event has invalid num of args.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
     it('HiAppEventJsTest011', 0, async function (done) {
        console.info('HiAppEventJsTest011 start');
        hiAppEvent.write().then((value) => {
            let result = value;
            expect(result).assertEqual(-3);
            done()
            console.info('HiAppEventJsTest011_1 end');
        }).catch((err) => {
            let result = err.code;
            expect(result).assertEqual(-3);
            done()
            console.info('HiAppEventJsTest011_2 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsTest012
     * @tc.desc: Error code -4 is returned when the event has invalid event domain.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
     it('HiAppEventJsTest012', 0, async function (done) {
        console.info('HiAppEventJsTest012 start');
        let name = "domain_test12";
        let type = hiAppEvent.EventType.STATISTIC;
        let params = {};
        let eventInfo1 = {
            domain: "domain***",
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo1, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-4)
            done()
            console.info('HiAppEventJsTest012_1 end');
        });

        let eventInfo2 = {
            domain: "domainTest",
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo2, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-4)
            done()
            console.info('HiAppEventJsTest012_2 end');
        });

        let eventInfo3 = {
            domain: "",
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo3, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-4)
            done()
            console.info('HiAppEventJsTest012_3 end');
        });

        let eventInfo4 = {
            domain: "a".repeat(17),
            name: name,
            eventType: type,
            params: params
        };
        hiAppEvent.write(eventInfo4, (err ,value) => {
            let result = err ? err.code : value;
            expect(result).assertEqual(-4)
            done()
            console.info('HiAppEventJsTest012_4 end');
        });
    });

    /**
     * @tc.name: HiAppEventJsPresetTest001
     * @tc.desc: Test preset events and preset parameters.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventJsPresetTest001', 0, async function (done) {
        console.info('HiAppEventJsPresetTest001 start');
        hiAppEvent.write(hiAppEvent.Event.USER_LOGIN, hiAppEvent.EventType.FAULT,
            {
                [hiAppEvent.Param.USER_ID]:"123456"
            },
            (err ,value) => {
                let result = err ? err.code : value;
                expect(result).assertEqual(0)
                done()
                console.info('HiAppEventJsPresetTest001_1 end');
            }
        );

        hiAppEvent.write(hiAppEvent.Event.USER_LOGOUT, hiAppEvent.EventType.STATISTIC,
            {
                [hiAppEvent.Param.USER_ID]:"123456"
            },
            (err ,value) => {
                let result = err ? err.code : value;
                expect(result).assertEqual(0)
                done()
                console.info('HiAppEventJsPresetTest001_2 end');
            }
        );

        hiAppEvent.write(hiAppEvent.Event.DISTRIBUTED_SERVICE_START, hiAppEvent.EventType.SECURITY,
            {
                [hiAppEvent.Param.DISTRIBUTED_SERVICE_NAME]:"test_service",
                [hiAppEvent.Param.DISTRIBUTED_SERVICE_INSTANCE_ID]:"123",
            },
            (err ,value) => {
                let result = err ? err.code : value;
                expect(result).assertEqual(0)
                done()
                console.info('HiAppEventJsPresetTest001_3 end');
            }
        );
        console.info('HiAppEventJsPresetTest001 end');
    });

    /**
     * @tc.name: HiAppEventConfigureTest001
     * @tc.desc: Error code -99 is returned when the logging function is disabled.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventConfigureTest001', 0, async function (done) {
        console.info('HiAppEventConfigureTest001 start');
        let res = hiAppEvent.configure({
            disable: true
        });
        expect(res).assertTrue();

        hiAppEvent.write("base_test13", hiAppEvent.EventType.SECURITY,
            {
                "key_str": "str",
            },
            (err ,value) => {
                let result = err ? err.code : value;
                expect(result).assertEqual(-99)
                done()
                console.info('HiAppEventConfigureTest001 end');
            }
        );
    });

    /**
     * @tc.name: HiAppEventConfigureTest002
     * @tc.desc: Correctly configure the event logging function.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventConfigureTest002', 0, function () {
        console.info('HiAppEventConfigureTest002 start');
        let result = false;

        result = hiAppEvent.configure({
            disable: true,
            maxStorage: "100m"
        });
        expect(result).assertTrue()

        result = hiAppEvent.configure({
            disable: false,
            maxStorage: "10G"
        });
        expect(result).assertTrue()

        result = hiAppEvent.configure({
            disable: false,
            maxStorage: "10M"
        });
        expect(result).assertTrue()

        console.info('HiAppEventConfigureTest002 end');
    });

    /**
     * @tc.name: HiAppEventConfigureTest003
     * @tc.desc: Incorrectly configure the event logging function.
     * @tc.type: FUNC
     * @tc.require: issueI4BY0R
     */
    it('HiAppEventConfigureTest003', 0, function () {
        console.info('HiAppEventConfigureTest003 start');
        let result = true;

        result = hiAppEvent.configure({
            disable: false,
            maxStorage: "xxx"
        })
        expect(result).assertFalse()

        result = hiAppEvent.configure(null)
        expect(result).assertFalse()

        result = hiAppEvent.configure({
            disable: null,
            maxStorage: {}
        })
        expect(result).assertFalse()

        console.info('HiAppEventConfigureTest003 end');
    });

    /**
     * @tc.name: HiAppEventClearTest001
     * @tc.desc: clear the local data.
     * @tc.type: FUNC
     * @tc.require: issueI5NTOS
     */
    it('HiAppEventClearTest001', 0, async function (done) {
        console.info('HiAppEventClearTest001 start');

        // 1. clear data
        let result = hiAppEvent.clearData();
        expect(result).assertUndefined();

        // 2. write event after clear data
        let eventInfo = {
            domain: "test_domain",
            name: "clear_test1",
            eventType: hiAppEvent.EventType.FAULT,
            params: {}
        };
        hiAppEvent.write(eventInfo, (err ,value) => {
            let res = err ? err.code : value;
            expect(res).assertEqual(0);
            done();
        });

        console.info('HiAppEventClearTest001 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest001
     * @tc.desc: invalid watcher type.
     * @tc.type: FUNC
     * @tc.require: issueI5LB4N
     */
    it('HiAppEventWatcherTest001', 0, function () {
        console.info('HiAppEventWatcherTest001 start');
        let result = true;
        result = hiAppEvent.addWatcher(null)
        expect(result).assertNull()
        result = hiAppEvent.addWatcher({})
        expect(result).assertNull()
        result = hiAppEvent.addWatcher(123)
        expect(result).assertNull()
        console.info('HiAppEventWatcherTest001 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest002
     * @tc.desc: invalid watcher name.
     * @tc.type: FUNC
     * @tc.require: issueI5LB4N
     */
    it('HiAppEventWatcherTest002', 0, function () {
        console.info('HiAppEventWatcherTest002 start');
        let result = true;
        result = hiAppEvent.addWatcher({
            name: null
        })
        expect(result).assertNull()
        result = hiAppEvent.addWatcher({
            name: 123
        })
        expect(result).assertNull()
        result = hiAppEvent.addWatcher({
            name: "a".repeat(33)
        })
        result = hiAppEvent.addWatcher({
            name: ""
        })
        expect(result).assertNull()
        expect(result).assertNull()
        result = hiAppEvent.addWatcher({
            name: "domain_***"
        })
        expect(result).assertNull()
        result = hiAppEvent.addWatcher({
            name: "Domain_test"
        })
        expect(result).assertNull()
        result = hiAppEvent.addWatcher({
            name: "_domain_test"
        })
        expect(result).assertNull()
        console.info('HiAppEventWatcherTest002 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest003
     * @tc.desc: invalid watcher trigger condition.
     * @tc.type: FUNC
     * @tc.require: issueI5LB4N
     */
    it('HiAppEventWatcherTest003', 0, function () {
        console.info('HiAppEventWatcherTest003 start');
        let result = true;
        let watcher = {
            name: "watcher1"
        };
        watcher.triggerCondition = null;
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()

        watcher.triggerCondition = 123;
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()

        watcher.triggerCondition = {
            row: null,
            size: 100,
            timeOut: 1,
        };
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()
        watcher.triggerCondition = {
            row: "invalid",
            size: 100,
            timeOut: 1,
        };
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()

        watcher.triggerCondition = {
            row: 10,
            size: null,
            timeOut: 1,
        };
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()
        watcher.triggerCondition = {
            row: 10,
            size: "invalid",
            timeOut: 1,
        };
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()

        watcher.triggerCondition = {
            row: 10,
            size: 100,
            timeOut: null,
        };
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()
        watcher.triggerCondition = {
            row: 10,
            size: 100,
            timeOut: "invalid",
        };
        result = hiAppEvent.addWatcher(watcher)
        expect(result).assertNull()
        console.info('HiAppEventWatcherTest003 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest004
     * @tc.desc: invalid watcher filters.
     * @tc.type: FUNC
     * @tc.require: issueI5LB4N
     */
    it('HiAppEventWatcherTest004', 0, function () {
        console.info('HiAppEventWatcherTest004 start');
        let result = true;
        let watcher = {
            name: "watcher1"
        };

        watcher.appEventFilters = null;
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = {};
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = "invalid";
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [1, 2];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: null
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: 123
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: "**xx"
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: "123test"
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: "a".repeat(17)
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: ""
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: "test_domain",
            eventTypes: null
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: "test_domain",
            eventTypes: "invalid"
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.appEventFilters = [{
            domain: "test_domain",
            eventTypes: ["invalid"]
        }];
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()
        console.info('HiAppEventWatcherTest004 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest005
     * @tc.desc: invalid watcher onTrigger.
     * @tc.type: FUNC
     * @tc.require: issueI5LB4N
     */
    it('HiAppEventWatcherTest005', 0, function () {
        console.info('HiAppEventWatcherTest005 start');
        let result = true;
        let watcher = {
            name: "watcher1",
            triggerCondition: {
                row: 10
            }
        };

        watcher.onTrigger = null;
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()

        watcher.onTrigger = "invalid";
        result = hiAppEvent.addWatcher(watcher);
        expect(result).assertNull()
        console.info('HiAppEventWatcherTest005 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest006
     * @tc.desc: add valid watcher.
     * @tc.type: FUNC
     * @tc.require: issueI5LB4N
     */
    it('HiAppEventWatcherTest006', 0, function () {
        console.info('HiAppEventWatcherTest006 start');
        let result = true;
        let watcher1 = {
            name: "watcher1",
        };
        result = hiAppEvent.addWatcher(watcher1);
        expect(result != null).assertTrue()

        let watcher2 = {
            name: "watcher2",
            triggerCondition: {}
        };
        result = hiAppEvent.addWatcher(watcher2);
        expect(result != null).assertTrue()

        let watcher3 = {
            name: "watcher3",
            triggerCondition: {
                row: 5
            },
            onTrigger: simpleTrigger
        };
        result = hiAppEvent.addWatcher(watcher3);
        expect(result != null).assertTrue()

        let watcher4 = {
            name: "watcher4",
            triggerCondition: {
                size: 1000
            },
            onTrigger: simpleTrigger
        };
        result = hiAppEvent.addWatcher(watcher4);
        expect(result != null).assertTrue()

        let watcher5 = {
            name: "watcher5",
            triggerCondition: {
                timeOut: 2
            },
            onTrigger: simpleTrigger
        };
        result = hiAppEvent.addWatcher(watcher5);
        expect(result != null).assertTrue()

        let watcher6 = {
            name: "watcher6",
            triggerCondition: {
                row: 5,
                size: 1000,
                timeOut: 2
            },
            onTrigger: simpleTrigger
        };
        result = hiAppEvent.addWatcher(watcher6);
        expect(result != null).assertTrue()

        let watcher7 = {
            name: "watcher7",
            appEventFilters: []
        };
        result = hiAppEvent.addWatcher(watcher7);
        expect(result != null).assertTrue()

        let watcher8 = {
            name: "watcher8",
            appEventFilters: [
                {domain: "domain_test", eventTypes: []},
                {domain: "default", eventTypes: [hiAppEvent.EventType.FAULT, hiAppEvent.EventType.BEHAVIOR]},
            ]
        };
        result = hiAppEvent.addWatcher(watcher8);
        expect(result != null).assertTrue()

        expect(hiAppEvent.removeWatcher(watcher1)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher2)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher3)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher4)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher5)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher6)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher7)).assertUndefined()
        expect(hiAppEvent.removeWatcher(watcher8)).assertUndefined()
        console.info('HiAppEventWatcherTest006 end');
    });

    /**
     * @tc.name: HiAppEventWatcherTest007
     * @tc.desc: watcher.onTrigger row test.
     * @tc.type: FUNC
     * @tc.require: issueI5KYYI
     */
    it('HiAppEventWatcherTest007', 0, async function (done) {
        console.info('HiAppEventWatcherTest007 start');
        let watcher = {
            name: "watcher",
            triggerCondition: {
                row: 1
            },
            onTrigger: function (curRow, curSize, holder) {
                console.info('HiAppEventWatcherTest007.onTrigger start');
                expect(curRow).assertEqual(1)
                expect(curSize > 0).assertTrue()
                expect(holder != null).assertTrue()

                let eventPkg = holder.takeNext();
                expect(eventPkg != null).assertTrue()
                expect(eventPkg.packageId).assertEqual(0)
                expect(eventPkg.row).assertEqual(1)
                expect(eventPkg.size > 0).assertTrue()
                expect(eventPkg.data.length).assertEqual(1)
                expect(eventPkg.data[0].length > 0).assertTrue()
                console.info('HiAppEventWatcherTest007.onTrigger end');
            }
        };
        let result = hiAppEvent.addWatcher(watcher);
        expect(result != null).assertTrue()

        hiAppEvent.write({
            domain: "test_domain",
            name: "ontrigger_test1",
            eventType: hiAppEvent.EventType.FAULT,
            params: {}
        }, (err ,value) => {
            let resCode = err ? err.code : value;
            expect(resCode).assertEqual(0)
        });

        setTimeout(() => {
            hiAppEvent.removeWatcher(watcher)
            done()
            console.info('HiAppEventWatcherTest007 end')
        }, 1000)

    });

    /**
     * @tc.name: HiAppEventWatcherTest008
     * @tc.desc: watcher.onTrigger size test.
     * @tc.type: FUNC
     * @tc.require: issueI5KYYI
     */
     it('HiAppEventWatcherTest008', 0, async function (done) {
        console.info('HiAppEventWatcherTest008 start');
        let watcher = {
            name: "watcher",
            triggerCondition: {
                row: 10,
                size: 200,
            },
            onTrigger: function (curRow, curSize, holder) {
                console.info('HiAppEventWatcherTest008.onTrigger start');
                expect(curRow).assertEqual(2)
                expect(curSize >= 200).assertTrue()
                expect(holder != null).assertTrue()

                let eventPkg = holder.takeNext();
                expect(eventPkg != null).assertTrue()
                expect(eventPkg.packageId).assertEqual(0)
                expect(eventPkg.row).assertEqual(2)
                expect(eventPkg.size >= 200).assertTrue()
                expect(eventPkg.data.length).assertEqual(2)
                expect(eventPkg.data[0].length > 0).assertTrue()
                expect(eventPkg.data[1].length > 0).assertTrue()
                console.info('HiAppEventWatcherTest008.onTrigger end');
            }
        };
        let result = hiAppEvent.addWatcher(watcher);
        expect(result != null).assertTrue()

        hiAppEvent.write({
            domain: "test_domain",
            name: "ontrigger_test2",
            eventType: hiAppEvent.EventType.FAULT,
            params: {}
        }, (err ,value) => {
            let resCode = err ? err.code : value;
            expect(resCode).assertEqual(0)
        });

        hiAppEvent.write({
            domain: "test_domain",
            name: "ontrigger_test2",
            eventType: hiAppEvent.EventType.FAULT,
            params: {}
        }, (err ,value) => {
            let resCode = err ? err.code : value;
            expect(resCode).assertEqual(0)
        });

        setTimeout(() => {
            hiAppEvent.removeWatcher(watcher)
            done()
            console.info('HiAppEventWatcherTest008 end')
        }, 1000)

    });

    /**
     * @tc.name: HiAppEventWatcherTest009
     * @tc.desc: watcher.onTrigger timeout test.
     * @tc.type: FUNC
     * @tc.require: issueI5KYYI
     */
     it('HiAppEventWatcherTest009', 0, async function (done) {
        console.info('HiAppEventWatcherTest009 start');
        let watcher = {
            name: "watcher",
            triggerCondition: {
                timeOut: 1
            },
            onTrigger: function (curRow, curSize, holder) {
                console.info('HiAppEventWatcherTest009.onTrigger start');
                expect(curRow).assertEqual(1)
                expect(curSize > 0).assertTrue()
                expect(holder != null).assertTrue()

                let eventPkg = holder.takeNext();
                expect(eventPkg != null).assertTrue()
                expect(eventPkg.packageId).assertEqual(0)
                expect(eventPkg.row).assertEqual(1)
                expect(eventPkg.size > 0).assertTrue()
                expect(eventPkg.data.length).assertEqual(1)
                expect(eventPkg.data[0].length > 0).assertTrue()
                console.info('HiAppEventWatcherTest009.onTrigger end');
            }
        };
        let result = hiAppEvent.addWatcher(watcher);
        expect(result != null).assertTrue()

        hiAppEvent.write({
            domain: "test_domain",
            name: "ontrigger_test3",
            eventType: hiAppEvent.EventType.FAULT,
            params: {}
        }, (err ,value) => {
            let resCode = err ? err.code : value;
            expect(resCode).assertEqual(0)
        });

        setTimeout(() => {
            hiAppEvent.removeWatcher(watcher)
            done()
            console.info('HiAppEventWatcherTest009 end')
        }, 3000)

    });

    /**
     * @tc.name: HiAppEventWatcherTest010
     * @tc.desc: watcher.holder test.
     * @tc.type: FUNC
     * @tc.require: issueI5NTOD
     */
     it('HiAppEventWatcherTest010', 0, async function (done) {
        console.info('HiAppEventWatcherTest010 start');
        let watcher = {
            name: "watcher",
        };
        let holder = hiAppEvent.addWatcher(watcher);
        expect(holder != null).assertTrue()

        hiAppEvent.write({
            domain: "test_domain",
            name: "holder_test1",
            eventType: hiAppEvent.EventType.FAULT,
            params: {}
        }, (err ,value) => {
            let resCode = err ? err.code : value;
            expect(resCode).assertEqual(0)
        });

        setTimeout(() => {
            let eventPkg = holder.takeNext();
            expect(eventPkg != null).assertTrue()
            expect(eventPkg.packageId).assertEqual(0)
            expect(eventPkg.row).assertEqual(1)
            expect(eventPkg.size > 0).assertTrue()
            expect(eventPkg.data.length).assertEqual(1)
            expect(eventPkg.data[0].length > 0).assertTrue()
            hiAppEvent.removeWatcher(watcher)
            done()
            console.info('HiAppEventWatcherTest010 end')
        }, 1000)
    });
});