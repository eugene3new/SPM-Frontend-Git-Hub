import { IDynamicFormBuilderItem } from '@common/DynamicForm';
import { IWizardGroup } from '@content/WizardSetup/models';
import { IHeaderPagination } from 'models/headers';
import { IGridError } from 'models/request';

export const isBrowser: boolean = typeof window !== 'undefined';

export const getString = (value: string | undefined) => value || '';

export const getNumber = (value: number) => (Number.isNaN(value) ? 0 : value);

export const getPercentage = (value: number) => (Number.isNaN(value) ? 0 : Math.floor(value * 100));

export const mapDataWithIndex = <T extends { id: number }, R>(
  array: T[] | undefined,
  data: Record<number, R>
): (R & { id: number; index: number })[] => {
  return array
    ? array
        .filter((item) => {
          return data[item.id];
        })
        .map((item, index) => {
          return { ...data[item.id], id: item.id, index };
        })
    : [];
};

export interface INavData {
  href: string;
  title: string;
  active?: boolean;
}

export const generateStaticPathFromObject = (routeData: Record<number, string>, withIndex?: boolean) => {
  const staticPaths = Object.values(routeData).map((value) => {
    return {
      params: { type: [value] },
    };
  });
  if (withIndex) {
    staticPaths.unshift({
      params: { type: [] },
    });
  }
  console.log(staticPaths);
  return staticPaths;
};

export const generateNavItems = (routeData: Record<number, string>, data: IWizardGroup[] | undefined, t: any, asPath: string) => {
  if (!data) {
    return {
      navItems: [],
      activeItem: null,
    };
  }
  // we need paths for creating hrefs
  const url = asPath.split('/');
  // this creates hash table of route Data
  // map the ids from response
  const navItems: INavData[] = [];
  let activeItem: IWizardGroup | null = null;
  data.forEach((item) => {
    if (item.id) {
      const isActive = url[2] === routeData[item.id];
      navItems.push({
        title: t(routeData[item.id]),
        href: `/${url[1]}/${routeData[item.id]}`,
        active: isActive,
      });
      if (isActive) {
        activeItem = item;
      }
    }
  });
  return {
    navItems,
    activeItem,
  };
};

export const generateInitialDataFromConfig = (config?: IDynamicFormBuilderItem[]) => {
  if (!config) {
    return {};
  }
  const initialData: Record<string, string> = {};
  config.forEach((item: IDynamicFormBuilderItem) => {
    switch (item.type) {
      case 'text':
      case 'textarea':
        initialData[item.name] = '';
        break;
      case 'select':
        initialData[item.name] = '';
        break;
      case 'repeater':
        console.log('it is reapter');
        initialData[item.name] = '';
        break;
      case 'array':
        {
          const test = generateInitialDataFromConfig(item.children);
          console.log(test);
        }
        break;
      default:
        break;
    }
  });
  return initialData;
};

export function arrayMoveMutable(array: any, fromIndex: number, toIndex: number) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

export function arrayMoveImmutable(array: any[], fromIndex: number, toIndex: number) {
  const arraytemp = [...array];
  arrayMoveMutable(arraytemp, fromIndex, toIndex);
  return arraytemp;
}

interface IResponseObject {
  id: number;
  parent: {
    id: number;
  };
}

interface IFlatObject {
  id: number;
  parentId: number;
}

export const gridResponsetoTree = (flatObject: IResponseObject[]) => {
  const hashTable = Object.create(null);
  flatObject.forEach((item) => {
    const { parent, ...rest } = item;
    hashTable[item.id] = { ...rest, children: [], parentId: item.parent ? item.parent.id : null };
  });
  const dataTree: IFlatObject[] = [];
  flatObject.forEach((item) => {
    if (item.parent?.id) {
      if (hashTable[item.parent.id]) {
        hashTable[item.parent.id].children.push(hashTable[item.id]);
      }
    } else {
      dataTree.push(hashTable[item.id]);
    }
  });
  return dataTree;
};

export const getPaginationData = (paginationHeaders: string): IHeaderPagination => {
  if (paginationHeaders) {
    return JSON.parse(paginationHeaders);
  }
  return {
    totalCount: 10,
    pageSize: 1,
    currentPage: 1,
    totalPages: 1,
    previousPageLink: null,
    nextPageLink: null,
  };
};

export const errorObjToArray = (obj: Record<string, any>): IGridError[] => {
  return Object.keys(obj).map((key) => {
    return { name: key, message: obj[key] };
  });
};

export const deepCopyObj: any = (obj: any) => {
  if (obj == null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i + 1) {
      copy[i] = deepCopyObj(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Object) {
    const copy: any = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const attr in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(attr)) copy[attr] = deepCopyObj(obj[attr]);
    }
    return copy;
  }
  throw new Error('Unable to copy obj this object.');
};
