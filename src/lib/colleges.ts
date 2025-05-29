
export interface College {
  id: string;
  name: string;
}

export const colleges: College[] = [
  { id: "stanford", name: "Stanford University" },
  { id: "mit", name: "Massachusetts Institute of Technology" },
  { id: "harvard", name: "Harvard University" },
  { id: "caltech", name: "California Institute of Technology" },
  { id: "ucla", name: "University of California, Los Angeles" },
  { id: "berkeley", name: "University of California, Berkeley" },
];

export const getCollegeById = (id: string): College | undefined => {
  return colleges.find(college => college.id === id);
};
