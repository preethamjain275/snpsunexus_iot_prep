export interface ComplexityInfo {
  bestCase: string;
  avgCase: string;
  worstCase: string;
  spaceComplexity: string;
  explanation: string;
}

export function getTopicComplexity(
  topic: {
    name: string;
    timeComplexity?: string;
    bestCase?: string;
    avgCase?: string;
    worstCase?: string;
    spaceComplexity?: string;
    complexityExplanation?: string;
  },
  subjectId?: string
): ComplexityInfo | null {
  if (
    subjectId === 'cn' ||
    subjectId === 'os' ||
    subjectId === 'Computer Networks' ||
    subjectId === 'Operating Systems'
  ) {
    return null;
  }

  if (topic.bestCase && topic.worstCase && topic.spaceComplexity) {
    return {
      bestCase: topic.bestCase,
      avgCase: topic.avgCase ?? topic.timeComplexity ?? topic.worstCase,
      worstCase: topic.worstCase,
      spaceComplexity: topic.spaceComplexity,
      explanation: topic.complexityExplanation ?? 'Algorithmic complexity derived from operations.',
    };
  }

  if (topic.timeComplexity || topic.worstCase || topic.spaceComplexity) {
    return {
      bestCase: topic.bestCase ?? 'O(1)',
      avgCase: topic.avgCase ?? topic.timeComplexity ?? 'O(n)',
      worstCase: topic.worstCase ?? topic.timeComplexity ?? 'O(n)',
      spaceComplexity: topic.spaceComplexity ?? 'O(1)',
      explanation: topic.complexityExplanation ?? 'Complexity based on problem properties.',
    };
  }

  const name = topic.name.toLowerCase();

  // Searching Algorithms
  if (name.includes('binary search')) {
    return {
      bestCase: 'O(1)',
      avgCase: 'O(log n)',
      worstCase: 'O(log n)',
      spaceComplexity: 'O(1) iterative / O(log n) recursive',
      explanation: 'Divides search space in half each step. Requires sorted array.',
    };
  }
  if (name.includes('linear search')) {
    return {
      bestCase: 'O(1)',
      avgCase: 'O(n)',
      worstCase: 'O(n)',
      spaceComplexity: 'O(1)',
      explanation: 'Scans elements sequentially until key is found.',
    };
  }

  // Sorting Algorithms
  if (name.includes('bubble sort')) {
    return {
      bestCase: 'O(n) (optimized)',
      avgCase: 'O(n²)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(1)',
      explanation: 'Repeatedly swaps adjacent elements if in wrong order.',
    };
  }
  if (name.includes('selection sort')) {
    return {
      bestCase: 'O(n²)',
      avgCase: 'O(n²)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(1)',
      explanation: 'Finds minimum element and places it at beginning.',
    };
  }
  if (name.includes('insertion sort')) {
    return {
      bestCase: 'O(n)',
      avgCase: 'O(n²)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(1)',
      explanation: 'Inserts elements into sorted sub-array.',
    };
  }
  if (name.includes('merge sort')) {
    return {
      bestCase: 'O(n log n)',
      avgCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      spaceComplexity: 'O(n)',
      explanation: 'Divide and conquer algorithm requiring auxiliary space for merging.',
    };
  }
  if (name.includes('quick sort')) {
    return {
      bestCase: 'O(n log n)',
      avgCase: 'O(n log n)',
      worstCase: 'O(n²)',
      spaceComplexity: 'O(log n) stack space',
      explanation: 'Partitions array around pivot. Worst case occurs with bad pivot selection.',
    };
  }
  if (name.includes('sort algorithm') || name.includes('sorting')) {
    return {
      bestCase: 'O(n log n)',
      avgCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      spaceComplexity: 'O(n) or O(1)',
      explanation: 'Efficient comparison-based sorting algorithm.',
    };
  }

  // Data Structures Operations & Language Fundamentals
  if (name.includes('array')) {
    return {
      bestCase: 'O(1) access',
      avgCase: 'O(1) access / O(n) search',
      worstCase: 'O(n) search & insert',
      spaceComplexity: 'O(n) memory allocation',
      explanation: 'Contiguous memory block allowing O(1) indexed lookup.',
    };
  }
  if (name.includes('string')) {
    return {
      bestCase: 'O(1) access',
      avgCase: 'O(n) traversal/concat',
      worstCase: 'O(n) search & copy',
      spaceComplexity: 'O(n) character storage',
      explanation: 'Immutable character sequence requiring O(n) space for string storage.',
    };
  }
  if (name.includes('loop')) {
    return {
      bestCase: 'O(1) (break condition)',
      avgCase: 'O(n) iterations',
      worstCase: 'O(n) iterations',
      spaceComplexity: 'O(1) loop counter',
      explanation: 'Repeatedly executes code block based on loop conditions.',
    };
  }
  if (name.includes('collection') || name.includes('arraylist') || name.includes('list')) {
    return {
      bestCase: 'O(1) access/add',
      avgCase: 'O(1) access / O(n) search',
      worstCase: 'O(n) search & resize',
      spaceComplexity: 'O(n) dynamic allocation',
      explanation: 'Dynamic resizable collection storing object references.',
    };
  }
  if (name.includes('linked list')) {
    return {
      bestCase: 'O(1) insert at head',
      avgCase: 'O(n) search/access',
      worstCase: 'O(n) search/access',
      spaceComplexity: 'O(n) pointer storage',
      explanation: 'Nodes linked via pointers. Dynamic sizing with no contiguous memory requirement.',
    };
  }
  if (name.includes('stack')) {
    return {
      bestCase: 'O(1) push/pop/peek',
      avgCase: 'O(1) push/pop/peek',
      worstCase: 'O(1) push/pop/peek',
      spaceComplexity: 'O(n) element storage',
      explanation: 'LIFO structure providing O(1) top operations.',
    };
  }
  if (name.includes('queue')) {
    return {
      bestCase: 'O(1) enqueue/dequeue',
      avgCase: 'O(1) enqueue/dequeue',
      worstCase: 'O(1) enqueue/dequeue',
      spaceComplexity: 'O(n) element storage',
      explanation: 'FIFO structure providing O(1) front/rear operations.',
    };
  }
  if (name.includes('hash table') || name.includes('hash map') || name.includes('hash')) {
    return {
      bestCase: 'O(1) lookup/insert',
      avgCase: 'O(1) lookup/insert',
      worstCase: 'O(n) (hash collisions)',
      spaceComplexity: 'O(n) bucket allocation',
      explanation: 'Uses hash functions to achieve average constant time operations.',
    };
  }
  if (name.includes('binary tree') || name.includes('tree')) {
    return {
      bestCase: 'O(1) root access',
      avgCase: 'O(log n) search/insert',
      worstCase: 'O(n) (unbalanced tree)',
      spaceComplexity: 'O(h) call stack / node storage',
      explanation: 'Hierarchical node structure with operations bounded by tree height h.',
    };
  }
  if (name.includes('graph') || name.includes('bfs') || name.includes('dfs')) {
    return {
      bestCase: 'O(1)',
      avgCase: 'O(V + E)',
      worstCase: 'O(V + E)',
      spaceComplexity: 'O(V) visited set & queue/stack',
      explanation: 'Traverses V vertices and E edges in graph adjacency representation.',
    };
  }
  if (name.includes('dynamic programming') || name.includes('memoization')) {
    return {
      bestCase: 'O(n)',
      avgCase: 'O(subproblems * transition)',
      worstCase: 'O(states)',
      spaceComplexity: 'O(states) DP table',
      explanation: 'Breaks problem into overlapping subproblems and caches intermediate results.',
    };
  }
  if (name.includes('b+ tree index') || name.includes('database index')) {
    return {
      bestCase: 'O(1)',
      avgCase: 'O(log n)',
      worstCase: 'O(log n)',
      spaceComplexity: 'O(n) index tree size',
      explanation: 'B+ Tree index speeds up row selection from O(n) table scan to O(log n).',
    };
  }
  if (
    name.includes('variable') ||
    name.includes('data type') ||
    name.includes('operator') ||
    name.includes('class') ||
    name.includes('object') ||
    name.includes('constructor') ||
    name.includes('inheritance') ||
    name.includes('polymorphism') ||
    name.includes('encapsulation') ||
    name.includes('abstraction') ||
    name.includes('interface') ||
    name.includes('package') ||
    name.includes('access modifier') ||
    name.includes('exception handling')
  ) {
    return {
      bestCase: 'O(1)',
      avgCase: 'O(1)',
      worstCase: 'O(1)',
      spaceComplexity: 'O(1) memory allocation',
      explanation: 'Core language construct operating with constant time and memory overhead.',
    };
  }

  // Non-algorithmic / theoretical concept
  return null;
}
