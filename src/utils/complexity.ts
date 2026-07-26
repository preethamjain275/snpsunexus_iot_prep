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
): ComplexityInfo {
  if (topic.bestCase && topic.worstCase && topic.spaceComplexity) {
    return {
      bestCase: topic.bestCase,
      avgCase: topic.avgCase ?? topic.timeComplexity ?? topic.worstCase,
      worstCase: topic.worstCase,
      spaceComplexity: topic.spaceComplexity,
      explanation: topic.complexityExplanation ?? 'Algorithmic complexity derived from operations.',
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
  if (name.includes('search') || name.includes('linear search')) {
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
  if (name.includes('sort')) {
    return {
      bestCase: 'O(n log n)',
      avgCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      spaceComplexity: 'O(n) or O(1)',
      explanation: 'Efficient comparison-based sorting algorithm.',
    };
  }

  // Data Structures
  if (name.includes('array') || name.includes('vector')) {
    return {
      bestCase: 'O(1) access',
      avgCase: 'O(1) access / O(n) search',
      worstCase: 'O(n) search & insert',
      spaceComplexity: 'O(n) memory allocation',
      explanation: 'Contiguous memory block allowing O(1) indexed lookup.',
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
      spaceComplexity: 'O(n)',
      explanation: 'LIFO structure providing O(1) top operations.',
    };
  }
  if (name.includes('queue')) {
    return {
      bestCase: 'O(1) enqueue/dequeue',
      avgCase: 'O(1) enqueue/dequeue',
      worstCase: 'O(1) enqueue/dequeue',
      spaceComplexity: 'O(n)',
      explanation: 'FIFO structure providing O(1) front/rear operations.',
    };
  }
  if (name.includes('hash') || name.includes('map') || name.includes('dictionary') || name.includes('set')) {
    return {
      bestCase: 'O(1) lookup/insert',
      avgCase: 'O(1) lookup/insert',
      worstCase: 'O(n) (hash collisions)',
      spaceComplexity: 'O(n)',
      explanation: 'Uses hash functions to achieve average constant time operations.',
    };
  }
  if (name.includes('tree') || name.includes('bst') || name.includes('binary tree')) {
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
  if (name.includes('dynamic programming') || name.includes('dp') || name.includes('memoization')) {
    return {
      bestCase: 'O(n) or O(n*w)',
      avgCase: 'O(subproblems * transition)',
      worstCase: 'O(states)',
      spaceComplexity: 'O(states) DP table',
      explanation: 'Breaks problem into overlapping subproblems and caches intermediate results.',
    };
  }
  if (name.includes('recursion') || name.includes('backtracking')) {
    return {
      bestCase: 'O(1) base case',
      avgCase: 'O(2^n) or O(n!)',
      worstCase: 'O(2^n) exponential',
      spaceComplexity: 'O(n) call stack',
      explanation: 'Function invokes itself until reaching base case, building execution stack frame.',
    };
  }
  if (name.includes('loop')) {
    return {
      bestCase: 'O(1) early exit',
      avgCase: 'O(n) per loop dimension',
      worstCase: 'O(n^k) nested loops',
      spaceComplexity: 'O(1) auxiliary variables',
      explanation: 'Iterates n times over sequence or range.',
    };
  }

  // OS / DBMS / Networks / General Operations
  if (subjectId === 'dbms' || name.includes('index') || name.includes('sql') || name.includes('join') || name.includes('transaction')) {
    if (name.includes('index')) {
      return {
        bestCase: 'O(1)',
        avgCase: 'O(log n)',
        worstCase: 'O(log n)',
        spaceComplexity: 'O(n) index tree size',
        explanation: 'B+ Tree index speeds up row selection from O(n) table scan to O(log n).',
      };
    }
    if (name.includes('join')) {
      return {
        bestCase: 'O(M + N) (hash join)',
        avgCase: 'O(M + N) / O(M * N)',
        worstCase: 'O(M * N) (nested loop join)',
        spaceComplexity: 'O(M) build table space',
        explanation: 'Combines two tables based on matching keys.',
      };
    }
    return {
      bestCase: 'O(1) cached lookup',
      avgCase: 'O(log n) index / O(n) table scan',
      worstCase: 'O(n) full scan',
      spaceComplexity: 'O(1) buffer pool frame',
      explanation: 'Database query execution complexity depends on index availability and join algorithm.',
    };
  }

  if (subjectId === 'os' || name.includes('process') || name.includes('thread') || name.includes('scheduling') || name.includes('memory')) {
    return {
      bestCase: 'O(1) hit / switch',
      avgCase: 'O(1) context switch / O(log n) scheduler',
      worstCase: 'O(n) page fault / queue search',
      spaceComplexity: 'O(1) PCB overhead / O(frames) page table',
      explanation: 'Operating system kernel context switching and memory allocation complexity.',
    };
  }

  if (subjectId === 'cn' || name.includes('tcp') || name.includes('ip') || name.includes('routing') || name.includes('dns')) {
    return {
      bestCase: 'O(1) RTT cached',
      avgCase: 'O(log V) routing lookup / O(RTT)',
      worstCase: 'O(V*E) route convergence',
      spaceComplexity: 'O(V) routing table / O(W) buffer window',
      explanation: 'Network packet propagation latency and routing table lookup bounds.',
    };
  }

  // Default Fallback
  return {
    bestCase: 'O(1)',
    avgCase: 'O(n)',
    worstCase: 'O(n)',
    spaceComplexity: 'O(1) auxiliary space',
    explanation: 'Algorithmic performance scales linearly with input size n.',
  };
}
