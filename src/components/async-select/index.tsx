import { Combobox, Loader, TextInput, useCombobox } from '@mantine/core';
import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface AsyncSelectProps<TItemType> {
  value?: string;
  onChange: (value: string) => void;
  fetchItems: (searchQuery: string, id?: string) => Promise<TItemType[]>;
  valueExpr: (item: TItemType) => string;
  keyExpr: (item: TItemType) => string;
  textExpr: (item: TItemType) => string;
  label?: ReactNode;
  placeholder?: string;
  onBlur?: () => void;
  disabled?: boolean;
  name?: string;
  error?: ReactNode;
}

function AsyncSelectInner<TItemType>(
  props: AsyncSelectProps<TItemType>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TItemType[] | null>(null);
  const [empty, setEmpty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOptions = (searchQuery: string, id?: string) => {
    setLoading(true);

    props
      .fetchItems(searchQuery, id)
      .then((result) => {
        setData(result);
        setEmpty(result.length === 0);
        if (id && result.length > 0) {
          setSearchQuery(props.textExpr(result[0]));
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setLoading(false);
      });
  };

  const options = (data || []).map((item) => (
    <Combobox.Option
      value={props.valueExpr(item)}
      key={props.keyExpr(item)}
    >
      {props.textExpr(item)}
    </Combobox.Option>
  ));

  useEffect(() => {
    if (props.value && !data && !searchQuery) {
      fetchOptions('', props.value);
    }
  }, [props.value, data, searchQuery]);

  return (
    <Combobox
      disabled={props.disabled}
      onOptionSubmit={(optionValue) => {
        props.onChange(optionValue);
        setSearchQuery(
          props.textExpr(
            data!.find((item) => props.valueExpr(item) === optionValue)!
          )
        );
        combobox.closeDropdown();
      }}
      withinPortal={true}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          ref={ref}
          name={props.name}
          label={props.label}
          placeholder={props.placeholder}
          value={searchQuery}
          error={props.error}
          onChange={(event) => {
            setSearchQuery(event.currentTarget.value);
            fetchOptions(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
            if (data === null) {
              fetchOptions(searchQuery);
            }
          }}
          onBlur={() => {
            combobox.closeDropdown();
            props.onBlur?.();
          }}
          rightSection={loading && <Loader size={18} />}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={data === null}>
        <Combobox.Options>
          {options}
          {empty && <Combobox.Empty>Hiçbir sonuç bulunamadı</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

const AsyncSelect = forwardRef(AsyncSelectInner) as <TItemType>(
  props: AsyncSelectProps<TItemType> & { ref?: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof AsyncSelectInner>;

export default AsyncSelect;
