export interface VocabularyTerm {

  id: string;

  label: string;

  altLabels?: string[];

}

export const VOCABULARY: VocabularyTerm[] = [{
  id: 'god',
  label: 'God',
  altLabels: ['Supreme God', 'Deity']
},{
  id: 'animals',
  label: 'Animals',
  altLabels: ['Fauna']
},{
  id: 'husbandry',
  label: 'Husbandry',
  altLabels: ['Animal Husbandry']
},{
  id: 'profession',
  label: 'Profession',
  altLabels: ['Occupation']
},{
  id: 'place',
  label: 'Place'
},{
  id: 'person',
  label: 'Person'
},{
  id: 'event',
  label: 'Event'
}]