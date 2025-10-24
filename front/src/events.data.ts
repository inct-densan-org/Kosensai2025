export interface ScheduleEvent {
    time: string;
    event: string;
    organizationPath?: string;
}

export const firstGymSchedule: { day1: ScheduleEvent[]; day2: ScheduleEvent[] } = {
    day1: [
        { time: "9:00~15:30", event: "軽音楽部", organizationPath: "bands" },
        { time: "15:30~17:00", event: "ダンス部", organizationPath: "dance" },
        { time: "17:00~19:00", event: "カラオケ発表 (中夜祭)" },
    ],
    day2: [
        { time: "9:00~15:30", event: "軽音楽部", organizationPath: "bands" },
        { time: "15:30~16:30", event: "電子計算機部 DJ", organizationPath: "densan-dj" },
        { time: "16:30~18:00", event: "有志発表", organizationPath: "volunteer-stage" },
        { time: "18:00~19:00", event: "花火 (後夜祭)" },
    ],
};

export const secondGymSchedule: { day1: ScheduleEvent[]; day2: ScheduleEvent[] } = {
    day1: [
        { time: "10:30~11:30", event: "吹奏楽部", organizationPath: "brass-band" },
        { time: "13:00~17:00", event: "機械技術部", organizationPath: "mechanical-tech" },
    ],
    day2: [
        { time: "9:00~11:00", event: "機械技術部", organizationPath: "mechanical-tech" },
        { time: "12:00~14:00", event: "休憩所"},
        { time: "14:00~14:50", event: "○×ゲーム" },
    ],
};

export const advancedCourseBuildingSchedule: { day1: ScheduleEvent[]; day2: ScheduleEvent[] } = {
    day1: [
        { time: "12:00~12:30", event: "よさこい部", organizationPath: "yosakoi" },
    ],
    day2: [
        { time: "11:00~12:00", event: "I Scream", organizationPath: "i-scream" },
        { time: "12:00~12:30", event: "よさこい部", organizationPath: "yosakoi" },
        { time: "13:00~14:30", event: "ダンス部", organizationPath: "dance" },
    ],
};
