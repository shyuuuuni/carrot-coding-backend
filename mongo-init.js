// 언어
const languages = ['javascript', 'python', 'java', 'c++'];

// 자료구조
const dataStructures = [
  { kr: '스택', en: 'stack' },
  { kr: '큐', en: 'queue' },
  { kr: '연결 리스트', en: 'linked list' },
  { kr: '우선순위 큐', en: 'priority queue' },
  { kr: '이진 탐색 트리', en: 'binary search tree' },
  { kr: '해시 테이블', en: 'hash table' },
  { kr: '트라이', en: 'trie' },
  { kr: '그래프', en: 'graph' },
  { kr: '힙', en: 'heap' },
  { kr: '세그먼트 트리', en: 'segment tree' },
  { kr: '이진 트리', en: 'binary tree' },
  { kr: '레드-블랙 트리', en: 'red-black tree' },
  { kr: 'B-트리', en: 'B-tree' },
  { kr: 'AVL 트리', en: 'AVL tree' },
  { kr: '스플레이 트리', en: 'splay tree' },
  { kr: '트립', en: 'treap' },
];

// 알고리즘
const algorithms = [
  { kr: 'KMP 알고리즘', en: 'Knuth-Morris-Pratt algorithm' },
  { kr: '백트래킹', en: 'backtracking' },
  { kr: 'A* 알고리즘', en: 'A* shortest path' },
  {
    kr: '최장 증가 부분 수열',
    en: 'Longest Increasing Subsequence',
  },
  { kr: '네트워크 플로우', en: 'network flow' },
  { kr: '랜덤화', en: 'randomization' },
  { kr: '펜윅 트리', en: 'Fenwick tree' },
  { kr: '최장 공통 부분 수열', en: 'Longest Common Subsequence' },
  { kr: '트리의 지름', en: 'tree diameter' },
  { kr: '최소 신장 트리', en: 'minimum spanning tree' },
  { kr: '다익스트라 알고리즘', en: 'Dijkstra algorithm' },
  { kr: '벨만-포드 알고리즘', en: 'Bellman-Ford algorithm' },
  { kr: '크루스칼 알고리즘', en: 'Kruskal algorithm' },
  { kr: '플로이드-워셜 알고리즘', en: 'Floyd-Warshall algorithm' },
  { kr: '퀵 셀렉트', en: 'quickselect' },
  { kr: '버블 소트', en: 'bubble sort' },
  { kr: '선택 정렬', en: 'selection sort' },
  { kr: '삽입 정렬', en: 'insertion sort' },
  { kr: '합병 정렬', en: 'merge sort' },
  { kr: '퀵 정렬', en: 'quick sort' },
  { kr: '힙 정렬', en: 'heap sort' },
  { kr: '카운팅 정렬', en: 'counting sort' },
  { kr: '기수 정렬', en: 'radix sort' },
];

db = db.getSiblingDB('admin');
db.auth('carrot', 'shyuuuuni-carrot-coding');

db = db.getSiblingDB('nest');

db.createCollection('chatgpts');
db.createCollection('chatgptrequests');
db.createCollection('datastructuredetails');
db.createCollection('algorithmdetails');

// chatgpts - data structure
db.chatgpts.insertOne({
  type: 'data-structure',
  question:
    'I want you to return the answer to [data-structure] in JSON form. The properties and values of JSON are as follows. Please answer only JSON.\n\ncode: Write a [data-structure] source code written in the [programming-language] language. The number of Tabs should be two. The appropriate tab and newline should be included. It shall be printed in the form of a reusable module. Please copy it right away and fill it out in a usable form.\ncomplexity: Write the method-specific time complexity contained in the source code previously written. Each method should return a JSON in the form of "Method Name": "Time Complexity".\ndescription: Write a description of [data-structure] in Korean.',
  results: ['code', 'complexity', 'description'],
  parameters: {
    'data-structure': '',
    'programming-language': '',
  },
});
// chatgpts - algorithm
db.chatgptrequests.insertOne({
  domain: 'algorithm',
  type: 'description',
  question:
    'I want you to return the answer to [algorithm] description. Write a description of [algorithm] in Korean. Please explain in as much detail as possible.',
  results: ['description'],
  parameters: {
    algorithm: '',
  },
});
// chatgpts - algorithm
db.chatgptrequests.insertOne({
  domain: 'algorithm',
  type: 'code',
  question:
    'I want you to return the answer to [algorithm] in JSON form. The properties and values of JSON are as follows. Please answer only JSON. code: Write a [algorithm] source code written in the [programming-language] language. The number of Tabs should be two. The appropriate tab and newline should be included. The source code must be executable and fully implemented. If you have multiple algorithms, show me one example source code. complexity: Write the method-specific time complexity contained in the source code previously written. Each method should return a JSON in the form of "Method Name": "Time Complexity".',
  results: ['code', 'complexity'],
  parameters: {
    algorithm: '',
    'programming-language': '',
  },
});

// data structure
languages.forEach((language) => {
  dataStructures.forEach(({ kr, en }) => {
    db.datastructuredetails.insertOne({
      language,
      state: 'created',
      reportedCount: 0,
      code: '',
      description: '',
      createdAt: {
        $date: '2023-04-06T21:10:37.109Z',
      },
      updatedAt: {
        $date: '2023-04-07T03:29:55.461Z',
      },
      name: {
        kr,
        en,
      },
      complexity: {},
    });
  });
});

// algorithm
algorithms.forEach(({ kr, en }) => {
  const query = {
    name: { kr, en },
    description: '',
    descriptionReportCount: 0,
    descriptionState: 'created',
    codes: [],
  };

  languages.forEach((language) => {
    query.codes.push({
      code: '',
      language,
      complexity: {},
      codeReportCount: 0,
      codeState: 'created',
    });
  });

  db.algorithmdetails.insertOne(query);
});
