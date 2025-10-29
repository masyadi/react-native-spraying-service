import React from 'react';

/**
 *
 * @param {Object} param
 * @param {Boolean} param.initializeLoading
 * @param {Function} param.onRefreshing
 * @param {Function} param.onLoadMored
 * @param {Function} param.onReseted
 * @returns
 */
export const usePagination = ({
  initializeLoading = true,
  onRefreshing,
  onLoadMored,
  onReseted,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(initializeLoading);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [hasMoreData, setHasMoreData] = React.useState(true);
  const [resetting, setResetting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const addItems = data => {
    if (currentPage == 1) {
      setLoading(false);
      setRefreshing(false);
      setResetting(false);
    }

    if (refreshing) {
      setItems(data);
    } else {
      setItems([...items, ...data]);
    }

    if (!data || !data.length) {
      setHasMoreData(false);
    }

    setLoadingMore(false);
    setCurrentPage(prev => prev + 1);
  };

  const onReset = React.useCallback(() => {
    setCurrentPage(1);
    setItems([]);
    setLoading(true);
    setLoadingMore(false);
    setRefreshing(false);
    setHasMoreData(true);
    setResetting(true);
  }, []);

  const onRefresh = React.useCallback(() => {
    setCurrentPage(1);
    setRefreshing(true);
    setHasMoreData(true);
  }, []);

  const onLoadMore = React.useCallback(() => {
    setLoadingMore(true);
  }, []);

  const onError = React.useCallback(error => {
    setCurrentPage(1);
    setItems([]);
    setLoading(false);
    setRefreshing(false);
    setError(error);
  }, []);

  const deleteItem = id => {
    setItems(prev => prev.filter(item => item?.id != id));
  };

  React.useEffect(() => {
    if (onRefreshing && refreshing) {
      onRefreshing();
    }
  }, [refreshing]);

  React.useEffect(() => {
    if (onLoadMored && loadingMore && hasMoreData) {
      onLoadMored();
    } else {
      setLoadingMore(false);
    }
  }, [loadingMore]);

  React.useEffect(() => {
    if (onReseted && resetting) {
      onReseted();
    }
  }, [resetting]);

  return {
    items,
    addItems,
    deleteItem,
    hasMoreData,
    loading,
    loadingMore,
    refreshing,
    onLoadMore,
    onRefresh,
    currentPage,
    onReset,
    onError,
    error,
  };
};
