export interface ScheduleItem {
    time: string;
    location: string;
}

export interface BandPerformance {
    bandName: string;
    "startAt ": string; // Note the space in "startAt " as per provided data
    endAt: string;
    songs: string[];
}

export interface OrganizationDetail {
    name: string;
    description: string;
    schedule?: ScheduleItem[];
    bandSchedule?: BandPerformance[][]; // Specific for bands, array of days, each day is array of performances
}

export const organizationDetails: { [key: string]: OrganizationDetail } = {
    "bands": {
        name: "軽音楽部",
        description: "両日ともに第一体育館で演奏します。熱いライブをぜひご覧ください！",
        bandSchedule: [
            // Day 1: 10月25日 (土)
            [
                {
                    "bandName": "夜鹿桜46",
                    "startAt ": "10:00",
                    "endAt": "10:20",
                    "songs": ["言って", "カトレア", "負け犬にアンコールはいらない"]
                },
                {
                    "bandName": "椎名贋作",
                    "startAt ": "10:30",
                    "endAt": "10:40",
                    "songs": ["歌舞伎町の女王", "ギブス"]
                },
                {
                    "bandName": "初星学園プロデューサー課",
                    "startAt ": "10:50",
                    "endAt": "11:05",
                    "songs": [
                        "Luna say maybe",
                        "コンテンポラリのダンス",
                        "サンフェーデッド"
                    ]
                },
                {
                    "bandName": "SAVON",
                    "startAt ": "11:15",
                    "endAt": "11:25",
                    "songs": ["さよならになりました", "ダンス・デカダンス"]
                },
                {
                    "bandName": "梨音",
                    "startAt ": "11:35",
                    "endAt": "12:00",
                    "songs": [
                        "シーグラス",
                        "セットイットオールフリー",
                        "Philosophy",
                        "ハナウタ",
                        "SHAMROCK"
                    ]
                },
                {
                    "bandName": "細身ｓ",
                    "startAt ": "13:00",
                    "endAt": "13:20",
                    "songs": [
                        "ジターバグ",
                        "Missing",
                        "風の日",
                        "supernova(ライブイントロver.)"
                    ]
                },
                {
                    "bandName": "ライアさんドットスティングレイ",
                    "startAt ": "13:30",
                    "endAt": "13:50",
                    "songs": ["テレキャスターストライプ", "ミドリ", "ラブコール"]
                },
                {
                    "bandName": "VACUUS",
                    "startAt ": "14:00",
                    "endAt": "14:10",
                    "songs": ["正しい街", "閃光少女"]
                },
                {
                    "bandName": "ブルハーツ",
                    "startAt ": "14:20",
                    "endAt": "14:40",
                    "songs": ["トレイントレイン", "情熱の薔薇", "リンダリンダ"]
                },
                {
                    "bandName": "Azzu",
                    "startAt ": "14:50",
                    "endAt": "15:10",
                    "songs": ["わかってる", "何℃でも", "不気味ちゃん", "ハニートースト"]
                }
            ],
            // Day 2: 10月26日 (日)
            [
                {
                    "bandName": "バックホーン",
                    "startAt ": "09:00",
                    "endAt": "09:15",
                    "songs": ["美しい名前", "罠"]
                },
                {
                    "bandName": "ワンオク大好き!!やっちゃうよー!!",
                    "startAt ": "09:25",
                    "endAt": "09:35",
                    "songs": ["努々", "Deeper Deeper"]
                },
                {
                    "bandName": "löwlive",
                    "startAt ": "09:50",
                    "endAt": "10:05",
                    "songs": ["どろん"]
                },
                {
                    "bandName": "Gawooo",
                    "startAt ": "10:15",
                    "endAt": "10:30",
                    "songs": ["Remenber Me", "Emotions", "Raise your flag"]
                },
                {
                    "bandName": "Radiohead",
                    "startAt ": "10:40",
                    "endAt": "10:50",
                    "songs": ["Just", "Creep"]
                },
                {
                    "bandName": "THE P.O.R.K",
                    "startAt ": "11:00",
                    "endAt": "11:20",
                    "songs": ["情熱の薔薇", "Basket Case", "Highway to hell"]
                },
                {
                    "bandName": "銀-FEET",
                    "startAt ": "12:45",
                    "endAt": "13:00",
                    "songs": ["River", "第ゼロ感", "super stomper"]
                },
                {
                    "bandName": "Morning glory",
                    "startAt ": "13:10",
                    "endAt": "13:25",
                    "songs": ["Supersonic", "Stand By Me", "Don't Look Back in Anger"]
                },
                {
                    "bandName": "ビバ",
                    "startAt ": "13:35",
                    "endAt": "14:15",
                    "songs": [
                        "名前を呼ぶよ",
                        "突破口",
                        "青い春",
                        "歓びの明日に",
                        "人として",
                        "予感",
                        "ひたむき"
                    ]
                },
                {
                    "bandName": "NEO OK ROCK",
                    "startAt ": "14:35",
                    "endAt": "15:10",
                    "songs": ["$SECRET"]
                }
            ]
        ]
    },
    "brass-band": {
        name: "吹奏楽部",
        description: "第二体育館で演奏会を行います。美しい音色をお楽しみください。",
        schedule: [
            { time: "10月25日(土) 10:30~11:30", location: "第二体育館" },
        ],
    },
    "dance": {
        name: "ダンス部",
        description: "パワフルなダンスを披露します。",
        schedule: [
            { time: "10月25日(土) 15:30~17:00", location: "第一体育館" },
            { time: "10月26日(日) 13:00~14:30", location: "専攻科棟前 (雨天時: 第二体育館)" },
        ],
    },
    "yosakoi": {
        name: "よさこい部",
        description: "専攻科棟前で迫力のある演舞を披露します。雨天時は第二体育館で行います。",
        schedule: [
            { time: "10月25日(土) 12:00~12:30", location: "専攻科棟前" },
            { time: "10月26日(日) 12:00~12:30", location: "専攻科棟前 (雨天時: 第二体育館)" },
        ],
    },
    "densan-dj": {
        name: "電子計算機部 DJ",
        description: "第一体育館がクラブハウスに！DJパフォーマンスをお楽しみください。",
        schedule: [
            { time: "10月26日(日) 15:30~16:30", location: "第一体育館" },
        ],
    },
    "volunteer-stage": {
        name: "有志発表",
        description: "学生有志による様々なパフォーマンスが繰り広げられます。",
        schedule: [
            { time: "10月26日(日) 16:30~18:00", location: "第一体育館" },
        ],
    },
    "mechanical-tech": {
        name: "機械技術部",
        description: "第二体育館で活動内容の展示やデモンストレーションを行います。",
        schedule: [
            { time: "10月25日(土) 13:00~17:00", location: "第二体育館" },
            { time: "10月26日(日) 9:00~11:00", location: "第二体育館" },
        ],
    },
    "i-scream": {
        name: "I scream!",
        description: "専攻科棟前で叫びフェスを開催！豪華景品も用意しています。",
        schedule: [
            { time: "10月26日(日) 11:00~12:00", location: "専攻科棟前" },
        ],
    },
};
