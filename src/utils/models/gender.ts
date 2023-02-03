import { JsonDecoder } from 'ts.data.json';

export enum Gender {
    male = 'male',
    female = 'female'
}

export const GenderDecoder: JsonDecoder.Decoder<Gender> = JsonDecoder.string.chain(gender => {
    switch (gender) {
        case Gender.male:
            return JsonDecoder.constant(Gender.male);
        case Gender.female:
            return JsonDecoder.constant(Gender.female);
        default:
            return JsonDecoder.fail(`Unknown gender : ${gender}`);
    }
});
