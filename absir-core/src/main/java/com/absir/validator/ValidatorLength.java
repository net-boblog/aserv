/**
 * Copyright 2014 ABSir's Studio
 * <p/>
 * All right reserved
 * <p/>
 * Create on 2014-1-2 下午7:31:04
 */
package com.absir.validator;

import com.absir.bean.inject.value.Bean;
import com.absir.core.dyna.DynaBinder;
import com.absir.property.PropertyResolverAbstract;
import com.absir.validator.value.Length;

import java.util.Map;

@Bean
public class ValidatorLength extends PropertyResolverAbstract<ValidatorObject, Length> {

    public ValidatorObject getPropertyObjectLength(ValidatorObject propertyObject, final int min, final int max) {
        if (propertyObject == null) {
            propertyObject = new ValidatorObject();
        }

        propertyObject.addValidator(new Validator() {

            @Override
            public String validate(Object value) {
                int length = value == null ? 0 : value instanceof String ? ((String) value).length() : -1;
                if (length >= 0 && (length >= min || length <= max)) {
                    return "Need " + min + " - " + max + " Length";
                }

                return null;
            }

            @Override
            public String getValidateClass(Map<String, Object> validatorMap) {
                if (min > 0) {
                    validatorMap.put("minlength", min);
                }

                if (max < Integer.MAX_VALUE) {
                    validatorMap.put("maxlength", max);
                }

                return null;
            }
        });

        return propertyObject;
    }

    @Override
    public ValidatorObject getPropertyObjectAnnotation(ValidatorObject propertyObject, Length annotation) {
        return getPropertyObjectLength(propertyObject, annotation.min(), annotation.max());
    }

    @Override
    public ValidatorObject getPropertyObjectAnnotationValue(ValidatorObject propertyObject, String annotationValue) {
        String[] parameters = annotationValue.split(",");
        if (parameters.length == 2) {
            return getPropertyObjectLength(propertyObject, DynaBinder.to(parameters[0], int.class), DynaBinder.to(parameters[1], int.class));
        }

        return propertyObject;
    }
}
