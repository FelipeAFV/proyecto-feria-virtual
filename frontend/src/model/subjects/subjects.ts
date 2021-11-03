interface Subject {
    name: string,
    value: SubjectValue
}

export enum SubjectValue {
    MAT = 'MAT',
    LEN = 'LEN',
    CCN = 'CCN',
    CCS = 'CCS',
    FIS = 'FIS',
    BIO = 'BIO',
    QMC = 'QMC'
}

const SUBJECTS: Subject[] = [
    {name: 'Matemáticas', value: SubjectValue.MAT},
    {name: 'Lenguagje', value: SubjectValue.LEN},
    {name: 'Ciencias Naturales', value: SubjectValue.CCN},
    {name: 'Ciencias Sociales / Historia', value: SubjectValue.CCS},
    {name: 'Física', value: SubjectValue.FIS},
    {name: 'Biología', value: SubjectValue.BIO},
    {name: 'Química', value: SubjectValue.QMC},
]

export default SUBJECTS;