import { EuiFlexGrid, EuiPageTemplate } from '@elastic/eui';
import { useEffect, useState } from 'react';
import { BiCopyAlt, BiCrown, BiDice5, BiMask, BiRocket, BiShieldAlt2, BiWorld } from 'react-icons/bi';

import * as API from '../api/Reviews';
import CategoryList from '../components/Categories/CategoryList';
import { useAuth } from '../stores/AuthContext';

const Categories = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      API.validate(user?.token ?? '');
      const categories = await API.getCategories();
      const formattedCategories = categories.map(async (category: any) => {
        const titleWords = category?.slug.split('-');
        const title = titleWords
          .map((word: string) => word[0].toUpperCase() + word.slice(1))
          .join(' ');

        const reviews = await API.fetchAllReviews('category', category.slug);

        return { ...category, title, reviews };
      });

      Promise.all(formattedCategories).then((categories) => {
        setCategories(() => [...categories]);
      });
    };

    if (categories.length < 1) {
      fetchCategories();
    }
  }, [categories, user?.token]);

  const icons = {
    dexterity: BiShieldAlt2,
    strategy: BiWorld,
    'hidden-roles': BiMask,
    'roll-and-write': BiDice5,
    'push-your-luck': BiCrown,
    'deck-building': BiCopyAlt,
    'engine-building': BiRocket,
  };

  return (
    <EuiPageTemplate restrictWidth={true} template="empty" style={{ marginTop: '4rem' }}>
      <EuiFlexGrid columns={3}>
        <CategoryList data={categories} icons={icons} />
      </EuiFlexGrid>
    </EuiPageTemplate>
  );
};

export default Categories;
